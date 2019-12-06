import{ Component } from '@angular/core'
import{ LessionService } from '../../../services/lession.module';
import { ActivatedRoute ,Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl :'managelession.component.html',
    selector :'managelession',
    providers: [LessionService]
})

export class ManageLessionComponent{
    arrLession:any=[];
    id: String;
    constructor(private lessionService :LessionService, private activatedRoute: ActivatedRoute,private toastr : ToastrService,private location :Location,private router :Router ){
        lessionService.getLession().subscribe(data=>{
            console.log(data);
            this.arrLession=data;
        });

    }
    delete(lession_id:any){
        //lession_id = this.activatedRoute.snapshot.params.id;
        this.toastr.error("Remove success!!");
        this.lessionService.deleteLession(lession_id).subscribe(data=>{
            console.log(data);
            this.arrLession=data;
            
        });
        window.location.reload();
    }
    signout()
        {
            this.router.navigate(["/login"]);
        }    
}