import { TestBed } from '@angular/core/testing';

import { RoleService } from './role.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Role } from 'src/app/model/role.model';

describe('RoleService', () => {
  let service: RoleService;
  let httpController: HttpTestingController;
  let roles: Role[] = [
    { id: '1', role: 'Admin' },
    { id: '2', role: 'Manager' },
    { id: '3', role: 'User' },
    // Add more items as needed
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RoleService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get roles', () => {
    service.GetRole().subscribe((data) => {
      expect(data).toEqual(roles);
    });
    const req = httpController.expectOne('http://localhost:8080/roles');
    expect(req.request.method).toBe('GET');
    req.flush(roles);
  });
});
