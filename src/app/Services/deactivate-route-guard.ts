import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CookieService } from 'ngx-cookie';



@Injectable()
export class DeactiveRouteGuard implements CanActivate {

    constructor(
        private router : Router, 
        private flashMessagesService: FlashMessagesService,
        private _cookieService: CookieService) { }

    canActivate() {
  	
  	    let token = this._cookieService.getObject('data');
    
        if( token ) {
            return true;
        } else {
            this.flashMessagesService.show('Please login to continue.',{ cssClass: 'alert-danger', timeout: 1000 });           
            this.router.navigate(['/login']);
        }
    }  
}