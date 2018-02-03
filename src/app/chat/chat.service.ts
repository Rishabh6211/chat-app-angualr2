import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as io from 'socket.io-client';
import 'rxjs/add/operator/map';  
@Injectable()
export class ChatService {
private url = 'http://localhost:1337';
private socket;
constructor(private http:Http) { }

	sendMessage(message){
    	this.socket.emit('add-message', message);    
  	}
  
  	getMessages() {
	    let observable = new Observable(observer => {
	      this.socket = io(this.url);
	      this.socket.on('success', (data) => {
	      	console.log("data",data)
	        observer.next(data);    
	      });
	      this.socket.on('error', (data) => {
	        observer.next(data);    
	      });
	      return () => {
	        this.socket.disconnect();
	      };  
	    })     
	    return observable;
  	}

  	getAllUsers(){
        let observable = new Observable(observer =>{
        	this.socket = io(this.url);
        	this.socket.emit('listing')
        	this.socket.on('list',(res)=>{
        		observer.next(res.data);
        	})
        	return () => {
	        this.socket.disconnect();
	      };
        })
        return observable;
  	}  


  	logout(body){
  		this.socket.emit('logout',body);
  		let observable = new Observable(observer =>{
	  		this.socket.emit('listing')
        	this.socket.on('list',(res)=>{
        		observer.next(res.data);
        	})
	  		return () => {
	        this.socket.disconnect();
	      };
  		})
  		return observable;
  		/*console.log("inserrvice",userId);
  		let body = {
  			userId:userId
  		}
  		let headers = new Headers();
  		return this.http.post(this.url+'/logout',body, {headers:headers}).map((res:Response)=>res.json())*/
  	}
}