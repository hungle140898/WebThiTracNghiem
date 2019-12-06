import{ Component,OnInit } from '@angular/core';
import{LoginService} from '../../../services/login.module'
import { ActivatedRoute ,Router } from '@angular/router';
import{AuthService,SocialUser,GoogleLoginProvider,FacebookLoginProvider} from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import {LocalStorage} from '@ngx-pwa/local-storage'
import 'rxjs/add/operator/filter';
@Component({
    templateUrl :'loginpage.component.html',
    selector :'loginpage',
    styleUrls: ['loginpage.component.css'],
    providers: [LoginService]
})
export class LoginPageComponent implements OnInit {
    public user : any = SocialUser;
    arrUser:any=[];
    public  loggedIn: boolean;
    username :string;
    password :string;
    data : any;
    id : any;
    email:any
    constructor(private localStorage :LocalStorage,private socialAuthService :AuthService,private loginService :LoginService,private route: ActivatedRoute,private router :Router,private toastr : ToastrService){
      
    }
    googlelogin():void{
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      if(this.loggedIn = (user != null)){
        localStorage.setItem('TokenFB',user.authToken);
        localStorage.setItem('Email',user.email);
        localStorage.setItem('User_ID',user.id);
        localStorage.setItem('Image',user.photoUrl);
        localStorage.setItem('User_Name',user.name); 
        this.toastr.success("Login Succes !")
        this.router.navigate(['/homepage'],{queryParams:{isLogged:this.loggedIn}});
      }
      else{
        this.socialAuthService.signOut();
        this.loggedIn = false;
        this.toastr.warning("Please Login ..!")
      }
    }).unsubscribe();
  }
    facebooklogin(){
        this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID); 
        this.socialAuthService.authState.subscribe((user) => {
        this.user = user;
        this.email = user.email;
        this.username = user.name;
        this.id = user.id;

        if(this.loggedIn = (user != null)){
            localStorage.setItem('TokenFB',user.authToken);
            localStorage.setItem('Email',user.email);
            localStorage.setItem('User_ID',user.id);
            localStorage.setItem('Image',user.photoUrl);
            localStorage.setItem('User_Name',user.name); 
            this.toastr.success("Login Succes !")
            this.router.navigate(['/homepage'],{queryParams:{isLogged:this.loggedIn}});
          }
          else{
            this.sigoutfacebook();
            this.loggedIn = false;
            this.toastr.warning("Please Login ..!")
          }
             
        }).unsubscribe();        
    }
    sigoutfacebook(): void {
        this.socialAuthService.signOut();
        localStorage.clear()
      }
      ngOnInit(){
        localStorage.clear()
        this.loggedIn = false;
        
      } 
      adminlogin(user:any,pass:any){
        console.log(user,pass);
        this.loginService.adminlogin(user,pass).subscribe(data=>{
          this.arrUser =data;
        })
        if(this.arrUser != null)
          this.router.navigate(["/managelession/"]);
        else 
          this.router.navigate(["/login"])
       }
}