import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CookieService } from 'ngx-cookie';
import { AuthService } from "angular2-social-login";
import { SharedService } from '../Services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService,SharedService]
})
export class LoginComponent implements OnInit {
  public loading = false;
	public nuser = {
		user:''
	}
	public user:any ;
  sub: any;
  public provider:any;

  constructor(private _router: Router, 
              private loginservice:LoginService,
              private _flashMessagesService: FlashMessagesService,
              private cookieService: CookieService,
              private _auth:AuthService,
              private _shared:SharedService) { }

  ngOnInit() {
    this.loading = true;
      setTimeout(()=>{    
        this.loading = false;
      console.log('loaderStopped');
    },2000);
  }

 submit(){
 	this.loginservice.userLogin(this.nuser).subscribe(res =>{
     
     let tempdata = {
       "user":res.data.user,
       "id":res.data._id
     }
     this.cookieService.putObject("userdata",tempdata);
     this.cookieService.put('userId', tempdata.id);
     if(res){
       this._flashMessagesService.show('Successfully login', { cssClass: 'alert-success', timeout: 1000 });
       this._router.navigate(['/chat'])
       
     }
     else{
       this._flashMessagesService.show('Invalid User', { cssClass: 'alert-danger', timeout: 3000 });
     }
 		
  /*  for(var i=0;i<res.length;i++){
      if(res[i].email == this.nuser.email && res[i].password == this.nuser.password){
        let cookieData = {
                        
                        "name" :res[i].name,
                        "email" :res[i].email
                 };
          this.cookieService.putObject( 'data', cookieData);
          
         this._flashMessagesService.show('Successfully login', { cssClass: 'alert-success', timeout: 1000 });
        this._router.navigate(['/home'])
        return false;
      }
      else{
        if(i==1){
          this._flashMessagesService.show('Invalid User', { cssClass: 'alert-danger', timeout: 3000 });
        }
      }
    }*/

 	});
 }
/* signIn(){
   this._shared.signIn(this.provider);
 }*/
 signIn(provider){
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
        
        this.cookieService.putObject( 'data', data);
        this._router.navigate(['/chat']);
        console.log(data);this.user=data;}

    )
}
  /*logout(){
    this._auth.logout().subscribe(
      (data)=>{
        
        console.log(data);this.user=null;
        
      }
    )
}*/
/*ngOnDestroy(){
    this.sub.unsubscribe();
}*/
}
