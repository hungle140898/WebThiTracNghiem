import {Injectable} from '@angular/core';
import{ HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';



@Injectable()

export class LessionService{
    urlparams : any;
    constructor( private http: HttpClient){}
    getLession()
    {
        //option
        let options = {
            headers : new HttpHeaders().set("Content-Type","application/x-www-form-unrlencoded")
        }
        return this.http.post("http://localhost:3000/api/lession",options);
    }
    addLession(name:any,theme:any,numques:any,level:any,time:any,score:any)
    {
        //console.log(name+"/"+theme+"/"+numques+"/"+level+"/"+time+"/"+score);
        let options = {
            headers : new HttpHeaders().set("Content-Type","application/x-www-form-unrlencoded"),
            params : new HttpParams().set('namelession',name).set('themelession',theme)
            .set('numques',numques).set('level',level).
            set("time",time).set('score',score)
        }
        return this.http.get("http://localhost:3000/api/addlession/save/",options).subscribe(response => {
            this.urlparams = response
            console.log("url:  "+this.urlparams);
        });
        
    }
    deleteLession(id:String)
    {
        let options = {
            headers : new HttpHeaders().set("Content-Type","application/x-www-form-unrlencoded")
        }
        return this.http.post("http://localhost:3000/api/lession/delete/"+id,options);
    }
    editLession(id:String)
    {
        let options = {
            headers : new HttpHeaders().set("Content-Type","application/x-www-form-unrlencoded")
        }
        return this.http.post("http://localhost:3000/api/editlession/"+id,options);
    }

    updateLession(id:any,name:any,theme:any,numques:any,level:any,time:any,score:any){
        let options = {
            headers : new HttpHeaders().set("Content-Type","application/x-www-form-unrlencoded"),
            params : new HttpParams().set('namelession',name).set('themelession',theme)
            .set('numques',numques).set('level',level).
            set("time",time).set('score',score)
        }

        // let options = {
        //     headers : new HttpHeaders().set("Content-Type","application/x-www-form-unrlencoded")
        // }

        console.log(id+"/"+name+"/"+theme+"/"+numques+"/"+level+"/"+time+"/"+score);
        return this.http.get("http://localhost:3000/api/editlession/save/"+id,options).subscribe(response => {
            this.urlparams = response
            console.log("url:  "+this.urlparams);
        });
        //return this.http.post("http://localhost:3000/api/editlession/save/"+id,options);
    }

}