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

describe('OrgAddComponent for adding', () => {
  let component: OrgAddComponent;
  let fixture: ComponentFixture<OrgAddComponent>;
  let orgService :OrganisationService
  let helperService:HelperService
  let activatedRoute:ActivatedRoute

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgAddComponent ],
      imports:[
        HttpClientModule,
        FormsModule,
      RouterTestingModule.withRoutes([{path:"org",component:OrgViewComponent}])
      ],
      providers:[OrganisationService,HelperService]
    })
    .compileComponents();
orgService=TestBed.inject(OrganisationService);
helperService= TestBed.inject(HelperService)
    fixture = TestBed.createComponent(OrgAddComponent);
    activatedRoute=TestBed.inject(ActivatedRoute)
    activatedRoute.snapshot.params={}
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should reflect data entered in input text feild',()=>{
    component.org.name="Org"
    component.org.address="Moozhikkal"
    component.org.desc="A good Org"
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const input = compiled.querySelectorAll('.org-add-form .margin-top .form-control');
expect(input[0].getAttribute('ng-reflect-model')).toBe('Org')
expect(input[1].getAttribute('ng-reflect-model')).toBe("Moozhikkal")
expect(input[2].getAttribute('ng-reflect-model')).toBe("A good Org")
  })
  it('should check wheather addPerson is called on button click',()=>{
    spyOn(component,'addOrg')
   
 
    const compiled = fixture.debugElement.nativeElement;
    const btn = compiled.querySelector(' .btn-primary')
    btn.click();
    fixture.detectChanges()
    expect(component.addOrg).toHaveBeenCalled()
  })
it('should add org ',()=>{
  spyOn(orgService,'addOrg').and.returnValue(of(true))
  spyOn(helperService,'navigate')
  let org = new Org()
  org.id=undefined
  component.addOrg()
expect(orgService.addOrg).toHaveBeenCalledWith(org)
expect(helperService.navigate).toHaveBeenCalledWith('/org')
})
});
describe('OrgAddComponent for editing', () => {
  let component: OrgAddComponent;
  let fixture: ComponentFixture<OrgAddComponent>;
  let orgService :OrganisationService
  let helperService:HelperService
  let org =new Org()
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgAddComponent ],
      imports:[
        HttpClientModule,
        FormsModule,
      RouterTestingModule.withRoutes([{path:"org",component:OrgViewComponent}])
      ],
      providers:[OrganisationService,HelperService]
    })
    .compileComponents();
orgService=TestBed.inject(OrganisationService);
helperService= TestBed.inject(HelperService)
activatedRoute=TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(OrgAddComponent);
    component = fixture.componentInstance;
  activatedRoute.snapshot.params={'id':'1'}
  org.id='1';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should reflect data entered in input text feild',()=>{
    expect(component.isAdd).toBe(false)
    component.org.name="Org"
    component.org.address="Moozhikkal"
    component.org.desc="A good Org"
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const input = compiled.querySelectorAll('.org-add-form .margin-top .form-control');
expect(input[0].getAttribute('ng-reflect-model')).toBe('Org')
expect(input[1].getAttribute('ng-reflect-model')).toBe("Moozhikkal")
expect(input[2].getAttribute('ng-reflect-model')).toBe("A good Org")
  })
  it('should check wheather addPerson is called on button click',()=>{
    spyOn(component,'addOrg')
   
 
    const compiled = fixture.debugElement.nativeElement;
    const btn = compiled.querySelector(' .btn-primary')
    btn.click();
    fixture.detectChanges()
    expect(component.addOrg).toHaveBeenCalled()
  })
it('should add org ',()=>{
  spyOn(orgService,'editOrg').and.returnValue(of(true))
  spyOn(helperService,'navigate')
  component.addOrg()
expect(orgService.editOrg).toHaveBeenCalledWith(org)
expect(helperService.navigate).toHaveBeenCalledWith('/org')
})
});
