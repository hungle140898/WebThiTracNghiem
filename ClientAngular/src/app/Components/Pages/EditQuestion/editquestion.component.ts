import{ Component } from '@angular/core'
import{ QuestionService } from '../../../services/question.module';
import { ActivatedRoute ,Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
    templateUrl :'editquestion.component.html',
    selector :'editquestion',
    styleUrls: ['editquestion.component.css'],
    providers: [QuestionService]
})

export class EditQuestionComponent{
    arrQuestion:any=[];
    id: any;
    constructor(private questionService :QuestionService,private toastr : ToastrService,private route: ActivatedRoute,private location :Location,private router :Router ){
        this.id = this.route.snapshot.params.id;
        this.questionService.editQuestion(this.id).subscribe(data=>{
            console.log(data);
            this.arrQuestion = data;
        });
        
    }
    save_edit(id_less:any,id_ques:any,title:any,ansA:any,ansB:any,ansC:any,ansD:any,result:any){
        console.log(id_less+"../"+id_ques+"../"+ansA+"../"+ansB+"../"+ansC+"../"+ansD+"../"+result);
        this.questionService.updateQuestion(id_less,id_ques,title,ansA,ansB,ansC,ansD,result);
        this.router.navigate(["/managelession/views/"+id_less]);
        this.toastr.success("Save Question Success!");
    }
    goback(id_less:any){
        console.log(id_less);
        this.router.navigate(["/managelession/views/"+id_less]);
    }
    signout()
        {
            this.router.navigate(["/login"]);
        }  
}