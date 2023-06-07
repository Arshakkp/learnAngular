import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAddComponent } from './org-add.component';
import { FormsModule } from '@angular/forms';
import { OrganisationService } from 'src/app/service/organisation/organisation.service';
import { Org } from 'src/app/model/org_model';
import { Call } from '@angular/compiler';
import { RouterTestingModule } from '@angular/router/testing';
import { OrgViewComponent } from '../org-view/org-view.component';
import { HelperService } from 'src/app/service/helper/helper.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PopupComponent } from '../widget/popup/popup.component';
import { SimpleChange, SimpleChanges } from '@angular/core';

describe('OrgAddComponent for adding', () => {
  let component: OrgAddComponent;
  let fixture: ComponentFixture<OrgAddComponent>;
  let orgService: OrganisationService;
  let helperService: HelperService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrgAddComponent, PopupComponent],
      imports: [
        HttpClientModule,
        FormsModule,

        RouterTestingModule.withRoutes([
          { path: 'org', component: OrgViewComponent },
        ]),
      ],
      providers: [OrganisationService, HelperService],
    }).compileComponents();
    orgService = TestBed.inject(OrganisationService);
    helperService = TestBed.inject(HelperService);
    fixture = TestBed.createComponent(OrgAddComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.snapshot.params = {};
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should reflect data entered in input text feild', () => {
    component.org.name = 'Org';
    component.org.address = 'Moozhikkal';
    component.org.desc = 'A good Org';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const input = compiled.querySelectorAll(
      '.org-add-form .margin-top .form-control'
    );
    expect(input[0].getAttribute('ng-reflect-model')).toBe('Org');
    expect(input[1].getAttribute('ng-reflect-model')).toBe('Moozhikkal');
    expect(input[2].getAttribute('ng-reflect-model')).toBe('A good Org');
  });
  it('should call addOrg function if do is true', () => {
    component.do = true;
    let changes: SimpleChanges = {
      do: {
        currentValue: true,
        previousValue: false,
        firstChange: true,
        isFirstChange: () => true,
      },
    };
    spyOn(component, 'ngOnChanges').and.callThrough();
    spyOn(component, 'addOrg');
    component.ngOnChanges(changes);
    expect(component.ngOnChanges).toHaveBeenCalled();
    expect(component.addOrg).toHaveBeenCalled();
  });
  it('should add org ', () => {
    spyOn(orgService, 'addOrg').and.returnValue(of(true));
    let org = new Org();
    org.name = 'Org';
    org.address = 'Moozhikkal';
    org.desc = 'A good Org';
    component.org.name = 'Org';
    component.org.address = 'Moozhikkal';
    component.org.desc = 'A good Org';
    component.addOrg();
    expect(orgService.addOrg).toHaveBeenCalledWith(org);
  });
});
describe('OrgAddComponent for editing', () => {
  let component: OrgAddComponent;
  let fixture: ComponentFixture<OrgAddComponent>;
  let orgService: OrganisationService;
  let helperService: HelperService;
  let org = new Org();
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrgAddComponent, PopupComponent],
      imports: [
        HttpClientModule,
        FormsModule,
        RouterTestingModule.withRoutes([
          { path: 'org', component: OrgViewComponent },
        ]),
      ],
      providers: [OrganisationService, HelperService],
    }).compileComponents();
    orgService = TestBed.inject(OrganisationService);
    helperService = TestBed.inject(HelperService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(OrgAddComponent);
    component = fixture.componentInstance;
    component.org.name = 'Org';
    component.org.address = 'Moozhikkal';
    component.org.desc = 'A good Org';
    component.org.id='1';
    org.id = '1';
    org.name = 'Org';
    org.address = 'Moozhikkal';
    org.desc = 'A good Org';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should reflect data entered in input text feild', () => {
   
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const input = compiled.querySelectorAll(
      '.org-add-form .margin-top .form-control'
    );
    expect(input[0].getAttribute('ng-reflect-model')).toBe('Org');
    expect(input[1].getAttribute('ng-reflect-model')).toBe('Moozhikkal');
    expect(input[2].getAttribute('ng-reflect-model')).toBe('A good Org');
  });
  it('should edit org ', () => {
  
    spyOn(orgService, 'editOrg').and.returnValue(of(true));
    component.addOrg();
    expect(orgService.editOrg).toHaveBeenCalledWith(org);
  });
  it('should call addOrg function if do is true', () => {
    component.do = true;
    let changes: SimpleChanges = {
      do: {
        currentValue: true,
        previousValue: false,
        firstChange: true,
        isFirstChange: () => true,
      },
    };
    spyOn(component, 'ngOnChanges').and.callThrough();
    spyOn(component, 'addOrg');
    component.ngOnChanges(changes);
    expect(component.ngOnChanges).toHaveBeenCalled();
    expect(component.addOrg).toHaveBeenCalled();
  });

});
