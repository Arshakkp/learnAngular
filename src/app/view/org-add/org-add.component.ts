import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Org } from 'src/app/model/org_model';
import { HelperService } from 'src/app/service/helper/helper.service';
import { OrganisationService } from 'src/app/service/organisation/organisation.service';


@Component({
  selector: 'app-org-add',
  templateUrl: './org-add.component.html',
  styleUrls: ['./org-add.component.scss'],
})
export class OrgAddComponent implements OnInit {
org:Org=new Org()
isAdd:boolean=true;
constructor(private orgFunc:OrganisationService,private helper:HelperService,private activatedRoute :ActivatedRoute){}
ngOnInit(): void {
  this.checkIfEdit()
}
checkIfEdit(){
  this.org.id= this.activatedRoute.snapshot.paramMap.get('id')??undefined
if(this.org.id){
  this.isAdd=false;
  this.orgFunc.getOrgById(this.org.id).subscribe((data)=>{
    this.org=data;
  })
}
}
addOrg(){
  alert("helllo")
  if(this.isAdd){
    this.orgFunc.addOrg(this.org).subscribe((data)=>{
      if(data){
        this.helper.navigate('/org')
      }
      else{
        
      }
    })
  }
  else{
    this.orgFunc.editOrg(this.org).subscribe((data)=>{
      if(data){
        this.helper.navigate('/org')
      }
    })
  }
 
 
}

}
