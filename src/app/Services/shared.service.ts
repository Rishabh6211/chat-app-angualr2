import { Injectable } from '@angular/core';
import { AuthService } from "angular2-social-login";
import { CookieService } from 'ngx-cookie';
import { Router, ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
@Injectable()
export class SharedService {
	public user:any ;
	sub: any;	
  	constructor(private _router: Router, private cookieService: CookieService, private _auth:AuthService) { }

  	signIn(provider){
	    this.sub = this._auth.login(provider).subscribe(
	      (data) => {
	        
	        this.cookieService.putObject( 'data', data);
	        this._router.navigate(['/home']);
	        console.log(data);this.user=data;}

	    )
	}

  	logout(){
	    this._auth.logout().subscribe(
	      (data)=>{
	         this.cookieService.removeAll();
    		this._router.navigate(['/login']);
	        console.log(data);this.user=null;
	        
	      }
	    )
	}
/*	ngOnDestroy(){
	    this.sub.unsubscribe();
	}*/

}
