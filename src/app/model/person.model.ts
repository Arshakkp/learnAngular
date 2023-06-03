import { Standard } from "./classes.model";
import { Role } from "./role.model";

export class Person {
    id?:string;
    name?:string;
    age?:number;
    address?:string;
    email?:string;
    orgId?:string;
    role?:string
    std?:string
}
export class PersonPagination{
    totalPage?:number;
  pageSize?:number;
   page?:number
   data:Person[]=[]
   

}