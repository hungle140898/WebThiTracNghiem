import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module'
import{ HttpClientModule } from '@angular/common/http';




// //Pages
// import { ManageQuestionComponent } from './Components/Pages/ManageQuestion/managequestion.component';
// import { ManageLessionComponent } from './Components/Pages/ManageLession/managelesstion.component';
// import { TestPageComponent } from './Components/Pages/TestPage/testpage.component';

@NgModule({
  declarations: [
    AppComponent,
   

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  
  ],
  providers: [
   
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
