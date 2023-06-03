import { Injectable } from '@angular/core';
import { Org, OrgPagination } from 'src/app/model/org_model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
 private organisation:Org[]=[]
 private id :number=0;
 constructor(private http :HttpClient){}
 
  addOrg(data:Org):Observable<boolean>{
    data.id=undefined;
    return this.http.post('http://localhost:8080/add/org',JSON.stringify(data)) as Observable<boolean>
  }
  deleteOrg(id:string){
    return this.http.get(`http://localhost:8080/delete/org/${id}`) as Observable<boolean>

  }  
  editOrg(data:Org):Observable<boolean>{
    return this.http.post(`http://localhost:8080/edit/org/${data.id}`,JSON.stringify(data)) as Observable<boolean>
  }
  getOrgList(page:number):Observable<OrgPagination>{
return this.http.get(`http://localhost:8080/orgs/${page}`) as Observable<OrgPagination>;
 
  }
  getOrgById(orgId:string):Observable<Org>{
    
    return this.http.get(`http://localhost:8080/org?id=${orgId}`) as Observable<Org>;
  }

}
