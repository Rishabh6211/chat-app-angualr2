import { Component, OnInit, OnDestroy, } from '@angular/core';
import { ChatService } from './chat.service';
import { CookieService } from 'ngx-cookie';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers:[ChatService]
})
export class ChatComponent implements OnInit, OnDestroy {

	messages = [];
	connection;
	public senderId:any;
	public receiverid:any;
	public data:any;
	public activeUser;
	message;
	public show = false;
	onlineuser;
	constructor(private chatService:ChatService,
				private cookieService: CookieService,
				private flashmessage:FlashMessagesService,
				private route:Router) { 

	}

	ngOnInit() {
		this.data =	this.cookieService.getObject('userdata')
			console.log("data",this.data)
		this.onlineUser();
		this.connection = this.chatService.getMessages().subscribe(message => {
      		this.messages.push(message);

   		})

   		/*this.chatService.getAllUsers().subscribe(res =>{
			if(res){
  				this.activeUser = res.data;
  				console.log("user",this.activeUser)
  			}
  			else{
  				console.log("something wrong");
  			}
   		})*/

	}
	ngOnDestroy() {
		this.connection.unsubscribe();
	}

	sendMessage(){
		this.senderId = this.data.id;
		//this.receiverid = this.data.id
		this.message = {
			senderId: this.senderId,
			receiverId:this.receiverid,
			message:this.message
		}
		console.log("message",this.message)
		this.chatService.sendMessage(this.message);
		this.message = '';
  	}
  	onlineUser(){

  		console.log("hello in online")
  		this.chatService.getAllUsers().subscribe(res => {

  			if(res){
  				this.activeUser = res;
  			}
  			else{
  				console.log("something wrong");
  			}
  		})
  	}
  	enable(onlineId){
  		console.log("recieverId",onlineId)
  		this.receiverid = onlineId
  		this.show = true
  	}
  	logout(){

  		console.log("user",this.data.id)
  		let body = {
  			userId:this.data.id
  		}
  		this.chatService.logout(body).subscribe(res =>{
  			
  			if(res){
  				//this.onlineUser();
  				this.flashmessage.show('Successfully logout', { cssClass: 'alert-success', timeout: 1000 });
  				this.route.navigate(['/login'])
  			}
  			else{
  				console.log("err")
  			}
  		});
  		
  		/*this.chatService.logout(this.data.id).subscribe(res =>{
  			if(res){
  				this.flashmessage.show('Successfully logout', { cssClass: 'alert-success', timeout: 1000 });
  				this.route.navigate(['/login'])
  			}else{
  				this.flashmessage.show('Error', { cssClass: 'alert-danger', timeout: 1000 });
  			}
  		})*/
  	}
}