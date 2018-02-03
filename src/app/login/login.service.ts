import { Injectable } from '@angular/core';
import {Router,RouterModule} from '@angular/router';
import 'rxjs/add/operator/map'
import  {Http, Response} from '@angular/http'

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  userLogin(body){
  	let user:string = body.user;
  	//let password:string = user.password;
/*
  	let body = {
  		'email':email,
  		'password':password
  	}*/

  	return this.http.post('http://localhost:1337/loginuser',body).map((res:Response)=>res.json())
  }

}
