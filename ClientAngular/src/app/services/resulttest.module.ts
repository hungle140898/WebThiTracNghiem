import {Injectable} from '@angular/core';
import{ HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';


@Injectable()

export class ResultTestService{
    constructor( private http: HttpClient ){}
    getHistory(id:any)
    {
        //option
        let options = {
            headers : new HttpHeaders().set("Content-Type","application/x-www-form-unrlencoded")
        }
        return this.http.get("http://localhost:3000/api/gethistory/"+id,options);
    }
}