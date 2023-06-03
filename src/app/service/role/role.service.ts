import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/model/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
GetRole():Observable<Role[]>{
return this.http.get('http://localhost:8080/roles') as Observable<Role[]>
}
  constructor(private http:HttpClient) { }
}
