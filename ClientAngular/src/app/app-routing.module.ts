import{ NgModule } from '@angular/core';
import{ Route, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import{ConfirmationPopoverModule} from 'angular-confirmation-popover';
import {SocialLoginModule,AuthServiceConfig,GoogleLoginProvider,FacebookLoginProvider} from 'angularx-social-login';
import { CountdownModule } from 'ngx-countdown';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { LoginPageComponent } from './Components/Pages/LoginPage/loginpage.component';
import { ManageQuestionComponent } from './Components/Pages/ManageQuestion/managequestion.component';
import { ManageLessionComponent } from './Components/Pages/ManageLession/managelesstion.component';
import { TestPageComponent } from './Components/Pages/TestPage/testpage.component';
import { AddLessionComponent } from './Components/Pages/AddLession/addlession.component';
import { AddQuestionComponent } from './Components/Pages/AddQuesion/addquestion.component';
import { EditQuestionComponent } from './Components/Pages/EditQuestion/editquestion.component';
import { EditLessionComponent } from './Components/Pages/EditLession/editlession.component';
import {HomePageComponent} from './Components/Pages/HomePage/homepage.component'
import { PagerService } from 'src/app/services/pageservice';
import{ResultTestComponent} from './Components/Pages/ResultTest/resulttest.component';




const config = new AuthServiceConfig([
  {
    id:GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('38418021401-mvhh2un4nir3773hr5r7h4cctj8jhk65.apps.googleusercontent.com')
  },
  {
    id:FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('430367907898501')
  },
]);

export function providerConfig(){
  return config;
}

@NgModule({
    declarations :[
       LoginPageComponent, ManageLessionComponent, ManageQuestionComponent, TestPageComponent,
       AddLessionComponent,AddQuestionComponent,EditLessionComponent,EditQuestionComponent,HomePageComponent,ResultTestComponent
    ],
    imports:[
        RouterModule.forRoot([
          {path:'managelession',component:ManageLessionComponent},
          {path:'managelession/views/:id',component:ManageQuestionComponent},
          {path:'managelession/delete/:id',component:ManageLessionComponent},
        //   {path:'managequestion',component:ManageQuestionComponent},
          {path:'addlession',component:AddLessionComponent},
          {path:'resulttest',component:ResultTestComponent},
          {path:'addlession/save',component:AddLessionComponent},
          {path:'addquestion/:id',component:AddQuestionComponent},
          {path:'testpage/:id',component:TestPageComponent},
          {path:'login',component:LoginPageComponent},
          {path:'editlession/:id',component:EditLessionComponent},
          {path:'editlession/:id/save',component:ManageLessionComponent},
          {path:'managequestion/edit/:id',component:EditQuestionComponent},
          {path:'managequestion/edit/save/:id',component:EditQuestionComponent},
          {path:'editquestion/:id',component:EditQuestionComponent},
          {path:'homepage',component:HomePageComponent},
          {path:'**',component:LoginPageComponent}
      ]),
        CommonModule,
        FormsModule,
        CountdownModule,
        SocialLoginModule,
        BrowserAnimationsModule,
        ConfirmationPopoverModule.forRoot({confirmButtonType:'danger'}),
        ToastrModule.forRoot({
          closeButton: true,
          newestOnTop: false,
          progressBar: false,
          preventDuplicates: true,
          positionClass: "toast-bottom-center",
          timeOut: 3000,
          extendedTimeOut: 1000,
        }),
        
    ],
    providers: [CookieService,
      {
        provide:AuthServiceConfig
      ,useFactory: providerConfig
    },PagerService
      
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{};