import { TestBed } from '@angular/core/testing';

import { ClassService } from './class.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Standard } from 'src/app/model/classes.model';
import { stdAndRole } from 'src/app/model/classAndRole.model';

describe('ClassService', () => {
  let service: ClassService;
let httpTestingController:HttpTestingController;
let standards:Standard[];
let stdAndRoles:stdAndRole[]
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(ClassService);
     standards= [
      { id: '1', std: 'First Standard' },
      { id: '2', std: 'Second Standard' },
      { id: '3', std: 'Third Standard' },
      // Add more items as needed
    ];
    stdAndRoles = [
      { userId: 1, roleId: 'role1', stdId: 'std1', id: '1' },
      { userId: 2, roleId: 'role2', stdId: 'std2', id: '2' },
      { userId: 3, roleId: 'role3', stdId: 'std3', id: '3' },
      // Add more items as needed
    ];
    httpTestingController=TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get standarts',()=>{
    service.getClasses().subscribe((data:Standard[])=>
    expect(data).toEqual(standards)
    );
    const req=httpTestingController.expectOne("http://localhost:8080/classes")
    expect(req.request.method).toBe('GET');
    req.flush(standards);
  })
it('should get std and role',()=>{
  service.getClassesAndRole('1').subscribe(data=>{
    expect(data).toEqual(stdAndRoles);
  })
  const req=httpTestingController.expectOne("http://localhost:8080/1/classandrole")
  expect(req.request.method).toBe('GET');
  req.flush(stdAndRoles);
})
it('should add std and role',()=>{
  service.addClassAndRole('1',stdAndRoles).subscribe(data=>{
    expect(data).toEqual(true);
  })
  const req = httpTestingController.expectOne("http://localhost:8080/1/addclassandrole");
  expect(req.request.method).toBe('POST');
  req.flush(true);
})
it('should add std and role as file',()=>{
  let file =new File([''],'file.csv')
  service.addClassAndRoleThroughFile('1',file).subscribe(data=>{
    expect(data).toEqual(true);
    
})
const req =httpTestingController.expectOne("http://localhost:8080/1/addclassandrolefile")
    expect(req.request.method).toBe('POST')
    req.flush(true)
})
});
