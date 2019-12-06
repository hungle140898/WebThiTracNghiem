import {Injectable} from '@angular/core';
import{ HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';


@Injectable()

export class QuestionService{
    urlparams : any;
    constructor( private http: HttpClient ){}
    getQuestion(id:any)
    {
        //option
        let options = {
            headers : new HttpHeaders().set("Content-Type","application/x-www-form-unrlencoded")
        }
        
        return this.http.post("http://localhost:3000/api/lession/views/"+id,options);
    }
    editQuestion(id:String)
    {
        let options = {
            headers : new HttpHeaders().set("Content-Type","application/x-www-form-unrlencoded")
        }
        return this.http.post("http://localhost:3000/api/editquestion/"+id,options);
    }
    deleteQuestion(id:String)
    {
        let options = {
            headers : new HttpHeaders().set("Content-Type","application/x-www-form-unrlencoded")
        }
        return this.http.post("http://localhost:3000/api/deletequestion/"+id,options);
    }
    addQuestion(id:any,title:any,ansA:any,ansB:any,ansC:any,ansD:any,result:any)
    {
        console.log(id+"/"+title+"/"+ansA+"/"+ansB+"/"+ansC+"/"+ansD+"/resule: "+result);
        let options = {
            headers : new HttpHeaders().set("Content-Type","application/x-www-form-unrlencoded"),
            params : new HttpParams().set('less_id',id).set('title',title)
            .set('ansA',ansA).set('ansB',ansB).
            set('ansC',ansC).set('ansD',ansD).set('result',result)
        }
        return this.http.get("http://localhost:3000/api/addquestion/save/",options).subscribe(response => {
            this.urlparams = response
            console.log("url:  "+this.urlparams);
        });
        
    }
    updateQuestion(id_less:any,id_ques:any,title:any,ansA:any,ansB:any,ansC:any,ansD:any,result:any){
        console.log(id_less+"/"+id_ques+"/"+title+"/"+ansA+"/"+ansB+"/"+ansC+"/"+ansD+"/resule: "+result);
        let options = {
            headers : new HttpHeaders().set("Content-Type","application/x-www-form-unrlencoded"),
            params : new HttpParams().set('less_id',id_less).set('ques_id',id_ques).set('title',title)
            .set('ansA',ansA).set('ansB',ansB).
            set('ansC',ansC).set('ansD',ansD).set('result',result)
        }
        return this.http.get("http://localhost:3000/api/editquestion/save/"+id_ques,options).subscribe(response => {
            this.urlparams = response
            console.log("url:  "+this.urlparams);
        });
    }
}