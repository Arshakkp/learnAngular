import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person, PersonPagination } from 'src/app/model/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http :HttpClient) { }
  addPerson(orgId:string,person:Person):Observable<Boolean>{
    return this.http.post(`http://localhost:8080/org/${orgId}/adduser`,JSON.stringify(person)) as Observable<Boolean>
  }
  addPersonsAsfile(orgId:string,file:File):Observable<Boolean>{
    let formData=new FormData()
    formData.append('file',file,file.name)
    return this.http.post(`http://localhost:8080/org/${orgId}/adduserfile`,formData) as Observable<Boolean>
  }
 deletePerson(id:string):Observable<Boolean>{
    return this.http.get(`http://localhost:8080/org/delete/${id}`) as Observable<Boolean>
  }
   editPerson(person:Person):Observable<Boolean>{
    return this.http.post(`http://localhost:8080/org/edit/user/${person.id}`,JSON.stringify(person)) as Observable<Boolean>
  }
  getPeopleByOrg(orgId:string,page :number):Observable<PersonPagination>{

    return this.http.get(`http://localhost:8080/org/${orgId}/users/${page}`) as Observable<PersonPagination>
  }
  getPersonById(id:string):Observable<Person>{
    return this.http.get(`http://localhost:8080/org/user/${id}`) as Observable<Person>

  }
}
