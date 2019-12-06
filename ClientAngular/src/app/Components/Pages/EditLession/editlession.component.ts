import{ Component,OnInit } from '@angular/core'
import{ LessionService } from '../../../services/lession.module';
import { ActivatedRoute ,Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl :'editlession.component.html',
    selector :'editlession',
    providers: [LessionService]
})

export class EditLessionComponent{
    arrLession:any=[];
    id: any;
    constructor(private lessionService :LessionService,private toastr : ToastrService,private route: ActivatedRoute,private location :Location,private router :Router ){
        this.id = this.route.snapshot.params.id;
        this.lessionService.editLession(this.id).subscribe(data=>{
            console.log(data);
            this.arrLession = data;
        });
        
    }
    save_edit(id:any,name:any,theme:any,numques:any,level:any,time:any,score:any){
        console.log(id+"../"+name+"../"+theme+"../"+numques+"../"+level+"../"+score);
        this.lessionService.updateLession(id,name,theme,numques,level,time,score);
        this.router.navigate(["/managelession"]);
        this.toastr.success("Save Lession Success!");
    }
    goback(){
        this.router.navigate(["/managelession"]);
    }
    signout()
        {
            this.router.navigate(["/login"]);
        }  
}