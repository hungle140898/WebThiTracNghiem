import {Injectable} from '@angular/core';
import{ HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Observable } from 'rxjs';
@Injectable()

export class HomeService{
    urlparams : any;
    constructor( private http: HttpClient ){}
    getLession()
    {
        //option
        let options = {
            headers : new HttpHeaders().set("Content-Type","application/x-www-form-unrlencoded")
        }
        return this.http.post("http://localhost:3000/api/lession",options);
    }
    checkUser(email:any,id:any,name:any){
        
        // console.log("Name : "+name
        // +"Email : "+email+"ID : "+id + "Token : "+token)
        let options = {
            headers : new HttpHeaders().set("Content-Type","application/x-www-form-unrlencoded"),
            params : new HttpParams().set('name',name).set('email',email)
            .set('id',id)
        }
        const time_to_login = Date.now() + 5; // one week
        localStorage.setItem('token',JSON.stringify(time_to_login))
        return this.http.get("http://localhost:3000/api/checkloginFB",options).subscribe(response => {
            this.urlparams = response
            console.log("url:  "+this.urlparams);
        });
    }
}