import{ Component,OnInit} from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router';
import{ResultTestService} from '../../../services/resulttest.module'
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
    templateUrl :'resulttest.component.html',
    selector :'resulttest',
    styleUrls :['resulttest.component.css'],
    providers: [ResultTestService]
})
export class ResultTestComponent implements OnInit{
    ans:any[];
    userID :any;titleLession:any;userName:any;
    showHis:boolean = false; 
    arrHis:any=[];
    arrQues:any=[];
    img:any;
    constructor(private rsService : ResultTestService,private routes : ActivatedRoute, private Router :Router){
        this.routes.queryParams.subscribe(params=>{
           this.ans = params.result;
           this.userID =params.userID;  
           this.titleLession =params.titleLession;
        });
        console.log(this.ans + "--" + this.userID);
        this.img = localStorage.getItem("Image");
        this.userName = localStorage.getItem("User_Name");
    }
    ngOnInit(){
    }
    showHistory(){
        this.showHis = true;
        console.log(this.userID);
        this.rsService.getHistory(this.userID).subscribe(data=>{
            this.arrHis = data;
        });
        // console.log(this.arrHis.Result);
        // console.log(this.arrHis);
    }
    sigoutfacebook(){
        this.Router.navigate(["/login"]);
    }

}