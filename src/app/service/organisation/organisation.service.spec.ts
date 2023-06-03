import { TestBed } from '@angular/core/testing';

import { OrganisationService } from './organisation.service';
import { Org, OrgPagination } from 'src/app/model/org_model';
import {HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('OrganisationService', () => {
  let service: OrganisationService,
  httpTestingController:HttpTestingController
const orgList: OrgPagination = {
  page:1,
  pageSize:3,
  totalPage:7,
  data:[
  {
    name: "Organization 1",
    address: "Address 1",
    id: "1",
    desc: "Description 1"
  },
  {
    name: "Organization 2",
    address: "Address 2",
    id: "2",
    desc: "Description 2"
  },
  {
    name: "Organization 3",
    address: "Address 3",
    id: "3",
    desc: "Description 3"
  },
  // Add more objects as needed
]};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule ]
    });
    service = TestBed.inject(OrganisationService);
httpTestingController=TestBed.inject(HttpTestingController)

  
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it(' should  get org list ',()=>{
service.getOrgList(1).subscribe(data=>{
  expect(data.data?.length).toBe(3)
  expect(data).toEqual(orgList)
})
const request =httpTestingController.expectOne('http://localhost:8080/orgs/1');
expect(request.request.method).toBe('GET')
request.flush(orgList)

  })
  it('should get org by id',()=>{
service.getOrgById('1').subscribe(data=>{
  expect(data).toEqual(orgList.data[0])
})
const request =httpTestingController.expectOne('http://localhost:8080/org?id=1');
expect(request.request.method).toBe('GET')
request.flush(orgList.data[0])
  })
  it('should edit org',()=>{
    const newOrg = {
      name:"New Org",
      address:"New Address",
      desc:"New Description"  ,
      id:"1",
      }
      service.editOrg(newOrg,).subscribe(data=>{
        expect(data).toBe(true)
      })
      const request =httpTestingController.expectOne(`http://localhost:8080/edit/org/${newOrg.id}`);
expect(request.request.method).toBe('POST')
request.flush(true);
  })
  it('should delete org',()=>{
   
      service.deleteOrg("1").subscribe(data=>{
        expect(data).toBe(true)
      })
      const request =httpTestingController.expectOne(`http://localhost:8080/delete/org/1`);
expect(request.request.method).toBe('GET')
request.flush(true);
  })
  it('should add new org',()=>{ 
    const newOrg = {
      name:"New Org",
      address:"New Address",
      desc:"New Description"  
      }
      service.addOrg(newOrg).subscribe(data=>{
        expect(data).toEqual(true)})
        const request =httpTestingController.expectOne('http://localhost:8080/add/org');
        expect(request.request.method).toBe('POST')
        request.flush(true)
      })
});

