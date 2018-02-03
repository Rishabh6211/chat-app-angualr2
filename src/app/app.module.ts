import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {RegisterationComponent} from './registeration/registeration.component';
import {LoginComponent} from './login/login.component';
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlashMessagesModule } from 'angular2-flash-messages';


import { Http, Response, HttpModule,ConnectionBackend } from '@angular/http';

import { LoadingModule } from 'ngx-loading';
import { CookieModule } from 'ngx-cookie';
import {ActiveRouteGuard} from './Services/activate-route-guard';
import {DeactiveRouteGuard}  from './Services/deactivate-route-guard';
import { Angular2SocialLoginModule } from "angular2-social-login";
import { ChatComponent } from './chat/chat.component';

let provider = {
    "google": {
      "clientId": "884784528076-g847vp5ikcef7p0kp3pd1q23meaigujh.apps.googleusercontent.com"
    }
    /*"linkedin": {
      "clientId": "LINKEDIN_CLIENT_ID"
    },
    "facebook": {
      "clientId": "FACEBOOK_CLIENT_ID",
      "apiVersion": "<version>" //like v2.4 
    }*/
  };

export const routes: Routes =[

{
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
},  
{
	path:'register',
	component:RegisterationComponent,
  
	// loadChildren: './home/home.module#HomeModule'
	 
},
{
  path:'login',
  component:LoginComponent,   
},
{
  path:'chat',
  component:ChatComponent, 
 
}
];
@NgModule({
  declarations: [
    AppComponent,
    RegisterationComponent,
    LoginComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    BrowserAnimationsModule,
    FlashMessagesModule,
    HttpModule,
    LoadingModule,
    Angular2SocialLoginModule,
    CookieModule.forRoot(), 
    RouterModule.forRoot(routes) 
  ],
  exports:[RouterModule],
  providers: [ActiveRouteGuard,DeactiveRouteGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
Angular2SocialLoginModule.loadProvidersScripts(provider);