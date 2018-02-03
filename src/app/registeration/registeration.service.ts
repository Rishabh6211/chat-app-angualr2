import { Injectable } from '@angular/core';
import {Router,RouterModule} from '@angular/router';
import 'rxjs/add/operator/map'
import  {Http, Response} from '@angular/http'

@Injectable()
export class RegisterationService {

  constructor(private http: Http) { }

   userRegister(body){
    console.log("body",body)
  	//let user:string = body.user;
  	return this.http.post('http://localhost:1337/chatuser',body).map((res:Response)=>res.json())
  }

}
