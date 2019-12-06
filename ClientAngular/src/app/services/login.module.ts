import {Injectable} from '@angular/core';
import{ HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService{
    urlparams : any;
   // private  loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');
    constructor( private http: HttpClient ){}
    loginFace(token:any)
    {
        console.log(token);
        //option
        let options = {
            headers : new HttpHeaders().set("Content-Type","application/x-www-form-unrlencoded")
        }
        return this.http.get("http://localhost:3000/",options);
    }
    checkUser(id:any,email:any,name:any){
        console.log(id+" "+email+" "+name);
        let options = {
            headers : new HttpHeaders().set("Content-Type","application/x-www-form-unrlencoded"),
            params : new HttpParams().set('id',id).set('name',name)
            .set('email',email)
        }
        return this.http.get("http://localhost:3000/api/checkloginFB",options).subscribe(response => {
            this.urlparams = response;})
    }
    adminlogin(username:any,password:any){
        let options = {
            headers : new HttpHeaders().set("Content-Type","application/x-www-form-unrlencoded"),
            params : new HttpParams().set('name',username)
            .set('pass',password)
        }
        return this.http.get("http://localhost:3000/api/adminlogin",options).map(response => response);
    }
}