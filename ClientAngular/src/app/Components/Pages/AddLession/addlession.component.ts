import{ Component } from '@angular/core'
import{ LessionService } from '../../../services/lession.module';
import { ActivatedRoute ,Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl :'addlession.component.html',
    selector :'addlessionlession',
    providers: [LessionService]
})

export class AddLessionComponent{
    namelession :string;themelession:string;numques:Number;level:string;time:Number;score:Number;
    constructor (private toastr : ToastrService,private route: ActivatedRoute,private addlessionservice:LessionService,private location :Location,private router :Router){
 
    }
    saveadd(name:any,theme:any,numques:any,level:any,time:any,score:any){
        this.addlessionservice.addLession(name,theme,numques,level,time,score);
        this.router.navigate(["/managelession"]);
        this.toastr.success("Adding Success!");
    }
    goback(){
        this.router.navigate(["/managelession"]);
    }
}



