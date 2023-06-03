import { TestBed } from '@angular/core/testing';

import { PersonService } from './person.service';
import { Person, PersonPagination } from 'src/app/model/person.model';
import {HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('PersonService', () => {
  let service: PersonService;
  let httpController:HttpTestingController
  const personList: PersonPagination ={page:1,totalPage:5,pageSize:5,data: [
    {
      id: "1",
      name: "John",
      age: 30,
      address: "123 Main St"
    },
    {
      id: "2",
      name: "Jane",
      age: 25,
      address: "456 Elm St"
    },
    {
      id: "3",
      name: "Michael",
      age: 40,
      address: "789 Oak St"
    },
    // Add more objects as needed
  ]};
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    httpController=TestBed.inject(HttpTestingController)
    service = TestBed.inject(PersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get people by orgid',()=>{
   service.getPeopleByOrg("1",1).subscribe(data=>{
    expect(data.data?.length).toBe(3)
    expect(data).toEqual(personList)
   })
   const req=httpController.expectOne("http://localhost:8080/org/1/users/1")
   expect(req.request.method).toBe('GET')
req.flush(personList)
  
  })
it('should add people by orgid',()=>{
service.addPerson('1',personList.data[0]).subscribe(data=>{
  expect(data).toBe(true)
})
const req=httpController.expectOne("http://localhost:8080/org/1/adduser")
expect(req.request.method).toBe('POST')
req.flush(true)
})
it('should edit people by id',()=>{
    service.editPerson(personList.data[0]).subscribe(data=>{
      expect(data).toBe(true)
    })
    const req=httpController.expectOne("http://localhost:8080/org/edit/user/1")
    expect(req.request.method).toBe('POST')
    req.flush(true)
    })
    it('should delete people by id',()=>{
        service.deletePerson('1').subscribe(data=>{
          expect(data).toBe(true)
        })
        const req=httpController.expectOne("http://localhost:8080/org/delete/1")
        expect(req.request.method).toBe('GET')
        req.flush(true)
        })
});
