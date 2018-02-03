import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterationComponent } from './registeration.component';
import { RouterModule, Routes }   from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'
 import { BrowserModule } from '@angular/platform-browser';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { LoadingModule } from 'ngx-loading';
// const routes: Routes = [
// {
// 	path : 'register',
// 	component: RegisterationComponent,
// 	data : {
// 		title : 'Registeration'
// 	}
// }
// ];

@NgModule({
  imports: [
   CommonModule,
   FormsModule,
   CustomFormsModule,
   BrowserModule,
   BrowserAnimationsModule,
   LoadingModule
   // RouterModule.forRoot()  
   // RouterModule.forChild(routes),
   ],
   //exports: [RouterModule],
  declarations: [RegisterationComponent]
})
export class RegisterationModule { }

  