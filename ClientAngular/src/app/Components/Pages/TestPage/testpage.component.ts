import{ Component,OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { QuestionService } from 'src/app/services/question.module';
import { ActivatedRoute,Router } from '@angular/router';
import { PagerService } from 'src/app/services/pageservice';
import { TestQuestionService } from 'src/app/services/testquestion.module';
import {LocalStorage} from '@ngx-pwa/local-storage'
import { Route } from '@angular/compiler/src/core';
import { ToastrService } from 'ngx-toastr';
import{AuthService,SocialUser,GoogleLoginProvider,FacebookLoginProvider} from 'angularx-social-login';
@Component({
    templateUrl :'testpage.component.html',
    selector :'testpage',
    styleUrls :['testpage.component.css'],
    providers: [TestQuestionService]
})

export class TestPageComponent implements OnInit{
    status = "ready";
    private arrQuestion:any=[];
    id_ques: any;
     

    // pager object
    pager: any = {};
    x :number = 50;
    // paged items
    pagedItems: any[];
    myToken :any;userID: any;userName:any;titleLession:any;
    timing : number;
    img:any;
    constructor(private pagerService :PagerService ,private socialAuthService :AuthService,private toastr : ToastrService,private testquestionService :TestQuestionService,private router: Router, private route: ActivatedRoute){
        this.id_ques = this.route.snapshot.params.id;
        this.img = localStorage.getItem('Image');
        this.userName = localStorage.getItem('User_Name');
        this.userID = localStorage.getItem('User_ID');
       // console.log(this.id_ques);
        this.route.queryParams . subscribe(params=>{
            this.timing = params.timing;
            this.titleLession = params.title;
           // console.log("Token.testpage : "+this.myToken +" - Timing : "+this.timing + "- UserId : "+this.userID);
        });
    }

    ngOnInit(){
        
        this.testquestionService.getQuestion(this.id_ques).subscribe(data=>{
                this.arrQuestion=data;
                //this.setPage(1);
        });  
       
    }
     @ViewChild("countdown",{ static: false }) private cd: CountdownComponent;
    config: CountdownConfig = { leftTime :300,format:'mm:ss'};
   
    start(start:any) 
    {
        if(start.action =="stop")
        {this.cd.config.leftTime=5;
        console.log("count down", this.cd);
        this.status = "started";}
       
    }
    timesUp(event:any,values:any) 
    { 
        if (event.action == "done") 
        {
             //console.log("Finished"); 
             this.toastr.info("Lession Time Out....Please Login Again!")
             const values1 = Object.keys(values).map(it =>values[it])
                this.testquestionService.saveResult(this.userID,this.userName,values,this.titleLession);
             console.log(values1);
             setTimeout(() => {
                this.router.navigate(["/resulttest"],{queryParams: {result : values1,userID:this.userID,userName:this.userName,titleLession:this.titleLession},skipLocationChange: true})
            },3000);
        } 
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.arrQuestion.length, page);

        // get current page of items
        this.pagedItems = this.arrQuestion.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
    templateForm(value:any){
        console.log(value);
        const values = Object.keys(value).map(it =>value[it])
        console.log("Hello" + values);
        this.testquestionService.saveResult(this.userID,this.userName,values,this.titleLession);
        setTimeout(() => {
            this.router.navigate(["/resulttest"],{queryParams: {result : values,userID:this.userID,userName:this.userName,titleLession:this.titleLession},skipLocationChange: true});
        },10);
    }
    handleChange(event:any){
    }
    sigoutfacebook(){
        this.socialAuthService.signOut();
        localStorage.clear();
        this.router.navigate(["/login/"]);
     }
}
