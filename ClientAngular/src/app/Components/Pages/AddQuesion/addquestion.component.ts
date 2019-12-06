import{ Component } from '@angular/core'
import { ActivatedRoute ,Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import{ QuestionService} from '../../../services/question.module';

@Component({
    templateUrl :'addquestion.component.html',
    selector :'addquestion',
    styleUrls: ['addquestion.component.css'],
    providers: [QuestionService]
})

export class AddQuestionComponent{
    arrQuestion:any=[];
    id:any;
    constructor(private questionService:QuestionService,private toastr : ToastrService,
        private route: ActivatedRoute,private location :Location,private router :Router ){
            this.id = this.route.snapshot.params.id;
            this.questionService.editQuestion(this.id).subscribe(data=>{
                console.log(data);
                this.arrQuestion = data;
            });
        }
        addquestion(id:any,title:any,ansA:any,ansB:any,ansC:any,ansD:any,result:any){
            this.questionService.addQuestion(id,title,ansA,ansB,ansC,ansD,result);
            this.router.navigate(["/managelession/views/"+this.id]);
            this.toastr.success("Adding Success!");
        }
        goback(){
             this.location.back();
            // // this.router.navigate(["/managelession"], { queryParams: { returnUrl: this.router.url }})
            // this.router.navigate(["/managelession"]);
        }
}