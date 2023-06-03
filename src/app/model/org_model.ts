export class Org {
    name?:string;
    address?:string;
    id?:string;
    desc?:string
}
export class OrgPagination{
    totalPage?:number;
  pageSize?:number;
   page?:number
   data:Org[]=[]

}