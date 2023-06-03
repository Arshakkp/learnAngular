import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { stdAndRole } from 'src/app/model/classAndRole.model';
import { Standard } from 'src/app/model/classes.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
getClasses():Observable<Standard[]>{
 
return this.http.get('http://localhost:8080/classes') as Observable<Standard[]>
}
getClassesAndRole(id:string):Observable<stdAndRole[]>{
return this.http.get(`http://localhost:8080/${id}/classandrole`) as Observable<stdAndRole[]>
}
downloadClassesAndRoleFile(id:string){
  window.open(`http://localhost:8080/${id}/classandrolefile`)
  }
addClassAndRole(id:string,data: stdAndRole[]):Observable<boolean>{
  console.log(JSON.stringify(data));
  return this.http.post(`http://localhost:8080/${id}/addclassandrole`,JSON.stringify(data))as Observable<boolean>
}
addClassAndRoleThroughFile(id:string,data:File):Observable<boolean>{
  const formData: FormData = new FormData();
  formData.append('file', data, data.name);
  return this.http.post(`http://localhost:8080/${id}/addclassandrolefile`,formData)as Observable<boolean>

}
  constructor(private http:HttpClient) { }
}
