import {Injectable} from '@angular/core';
import{ HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';




@Injectable()
export class TestQuestionService{
    urlparams:any;
    constructor( private http: HttpClient ){}
    getQuestion(id:any)
    {
        //option
        let options = {
            headers : new HttpHeaders().set("Content-Type","application/x-www-form-unrlencoded")
        }
        return this.http.post("http://localhost:3000/api/testpage/"+id,options);
    }
    saveResult(userID:any,userName:any,values:any,titleLession:any){
        //console.log(userID+".."+userName+".."+values+".."+titleLession);
        let options = {
            headers : new HttpHeaders().set("Content-Type","application/x-www-form-unrlencoded"),
            params : new HttpParams().set('id',userID).set('name',userName).set('values',values).set('title',titleLession)
        }
        
        return this.http.get("http://localhost:3000/api/testpage/saveresults/",options).subscribe(response => {
            this.urlparams = response
            console.log("url:  "+this.urlparams);
        });   
    }
}