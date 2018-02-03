import { Component, OnInit, Input } from '@angular/core';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import {RegisterationService} from './registeration.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css'],
  providers:[RegisterationService],
 animations: [
    trigger('myAwesomeAnimation', [
        state('small', style({
            transform: 'scale(1)',
        })),
        state('large', style({
            transform: 'scale(1.2)',
        })),
        transition('small => large', animate('100ms ease-in')),
    ]),
  ]
})
export class RegisterationComponent implements OnInit {
 //@Input() Component: Component;
 public loading = false;
 public user = {
      user:''
 }
state: string = 'small';

  constructor(  private _registerationService:RegisterationService,
                private _flashMessagesService:FlashMessagesService,
                private _router:Router) { }

  ngOnInit() {
    this.loading = true;
      setTimeout(()=>{    
        this.loading = false;
      console.log('loaderStopped');
    },2000);
  }
  

  animateMe() {
        this.state = (this.state === 'small' ? 'large' : 'small');
  }

  registerUser(){
    console.log("data",this.user)
    this._registerationService.userRegister(this.user).subscribe(res =>{
      console.log("respe",res)
      if(res){
        this._flashMessagesService.show('Successfully Register', { cssClass: 'alert-success', timeout: 1000 });
        this._router.navigate(['/login'])
      }
      else {
        console.log("AG")
      }
 
    }, err => {
      this._flashMessagesService.show('Already registerd', { cssClass: 'alert-danger', timeout: 3000 });
    })
  }

}
