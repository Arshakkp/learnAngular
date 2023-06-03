import { Component, OnInit,  } from '@angular/core';
import { Org, OrgPagination } from 'src/app/model/org_model';
import { ClassService } from 'src/app/service/class/class.service';
import { HelperService } from 'src/app/service/helper/helper.service';
import { OrganisationService } from 'src/app/service/organisation/organisation.service';

@Component({
  selector: 'app-org-view',
  templateUrl: './org-view.component.html',
  styleUrls: ['./org-view.component.scss']
})
export class OrgViewComponent implements OnInit{
orgPagination=new OrgPagination()
popUpEnable:boolean=false;
  viewMore:boolean[]=[]
  constructor(private helper:HelperService,private orgFunc:OrganisationService,){}
  ngOnInit(): void {
    this.getOrgList(1)
    

  }

  getOrgList(page:number){
   this.orgFunc.getOrgList(page).subscribe((data)=>{
    this.orgPagination=data
   })
    this.addViewMore()

  }
  addViewMore(){
    length = this.orgPagination.data?.length??0;
    for(let i =0;i<length;i++){
      this.viewMore.push(false)
    }
  }
  launchPop(){
this.popUpEnable=true;
  }
  viewMoreClick(i:number){  
    this.viewMore[i]=!this.viewMore[i]
    }
  navTo(path:string){
    this.helper.navigate(path);
  }
  deleteOrg(id:string|undefined){
    if(id){
      console.log(id)
    this.orgFunc.deleteOrg(id).subscribe((data)=>{
      if(data){
        this.getOrgList(this.orgPagination.page??1);
      }
    })
  }
  }
}
