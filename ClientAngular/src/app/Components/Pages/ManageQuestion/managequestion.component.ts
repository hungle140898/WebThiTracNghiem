import{ Component } from '@angular/core';
import{ QuestionService } from '../../../services/question.module';
import { ActivatedRoute ,Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl :'managequestion.component.html',
    selector :'managequestion',
    providers: [QuestionService],
    
})

export class ManageQuestionComponent{
    arrQuestion:any=[];
    id: any;
    constructor(private questionService :QuestionService, private activatedRoute: ActivatedRoute,
        private toastr : ToastrService,private location :Location,private router :Router,){
        this.id = this.activatedRoute.snapshot.params.id;
        this.questionService.getQuestion(this.id).subscribe(data=>{
                console.log(data);
                this.arrQuestion=data;
            });
    }
    deletequestion(ques_id:any){
        //lession_id = this.activatedRoute.snapshot.params.id;
        this.toastr.error("Remove success!!");
        this.questionService.deleteQuestion(ques_id).subscribe(data=>{
            console.log(data);
            this.arrQuestion=data;
        });
        window.location.reload();
    }
    editquestion(){
        
    }
    signout()
        {
            this.router.navigate(["/login"]);
        }  
}