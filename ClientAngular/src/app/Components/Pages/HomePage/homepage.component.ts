import{ Component,OnInit } from '@angular/core';
import{HomeService} from '../../../services/home.module'
import { ActivatedRoute ,Router,ActivatedRouteSnapshot,RouterStateSnapshot,CanActivate } from '@angular/router';
import * as moment from 'moment';
import {formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {LocalStorage} from '@ngx-pwa/local-storage'
import 'rxjs/add/operator/filter';
import{AuthService,SocialUser,GoogleLoginProvider,FacebookLoginProvider} from 'angularx-social-login';

@Component({
    templateUrl :'homepage.component.html',
    
    selector :'homepage',
    styleUrls: ['homepage.component.css'],
    providers: [HomeService]
})

export class HomePageComponent implements OnInit  {
    arrLession:any=[];
    public user : any = SocialUser;
    public  loggedIn: boolean;
    username :string;
    data : any;
    id : any;
    email:any;image:any;
    time_now:any;
    constructor(private localStorage :LocalStorage,private homeService :HomeService,private socialAuthService :AuthService,private toastr : ToastrService,private route: ActivatedRoute,private router :Router ){
       
    }
    ngOnInit(){
      this.route.queryParams . subscribe(params=>{
      this.loggedIn = params.isLogged;});
      this.image = localStorage.getItem("Image");
      this.username = localStorage.getItem("User_Name");
      this.homeService.getLession().subscribe(data=>{
        this.arrLession = data;
      });
    } 
    doTest(id:any,Timing:Number,titlelession:any){
      this.router.navigate(["/testpage/"+id],{ queryParams: { timing:Timing,title:titlelession} });
      //console.log("Token.ts : "+token + "- Timing : "+Timing);
      // setTimeout(() => {
      //   window.location.reload();
      // },15000);    
   }
   hideTest(){

   }
   sigoutfacebook(){
      this.socialAuthService.signOut();
      localStorage.clear();
      this.router.navigate(["/login/"]);
   }
}