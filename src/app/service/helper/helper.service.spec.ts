import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { HelperService } from './helper.service';
import { OrgViewComponent } from 'src/app/view/org-view/org-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ProviderToken } from '@angular/core';

describe('HelperService', () => {
  let service: HelperService;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule.withRoutes([{
          path:'org',
          component:OrgViewComponent
        }])
      ],
      declarations:[
        OrgViewComponent
      ]
    });
    location=TestBed.inject(Location)
    service = TestBed.inject(HelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it("should navigate",fakeAsync(()=>{
service.navigate('/org');
tick();
expect(location.path()).toBe('/org')
  }))
});

