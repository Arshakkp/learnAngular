import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAddComponent } from './person-add.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PersonComponent } from '../person/person.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { PersonService } from 'src/app/service/person/person.service';
import { HelperService } from 'src/app/service/helper/helper.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('PersonAddComponent', () => {
  let component: PersonAddComponent;
  let fixture: ComponentFixture<PersonAddComponent>;
  let activatedRoute:ActivatedRoute;
  let personService:PersonService;
  let helperService:HelperService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonAddComponent ],
      imports:[RouterTestingModule.withRoutes([{path:'org/:id/users',component:PersonComponent}]),FormsModule,HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonAddComponent);
    activatedRoute=TestBed.inject(ActivatedRoute)
    personService=TestBed.inject(PersonService);
    helperService=TestBed.inject(HelperService);  
    activatedRoute.snapshot.params={'orgId':'0'}
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should model bind with input field',()=>{
    component.person.name="Arshak"
    component.person.address="test"
    component.person.age=25;
    fixture.detectChanges()
    const compile = fixture.debugElement.nativeElement;
    const inputs=compile.querySelectorAll('.org-add-form input ')
   expect(inputs[0].getAttribute('ng-reflect-model')).toBe("Arshak")
   expect(inputs[1].getAttribute('ng-reflect-model')).toBe("test")
   expect(inputs[2].getAttribute('ng-reflect-model')).toBe("25")
  })
  it('should add and route on btn click',()=>{
    spyOn(component ,'addPerson')
    fixture.detectChanges()
    const compile = fixture.debugElement.nativeElement;
    const btn=compile.querySelector('.org-add-form button')
    btn.click()
    fixture.detectChanges()
    expect(component.addPerson).toHaveBeenCalled()

  })
  it('should add person ',()=>{ 
    spyOn(personService,'addPerson').and.returnValue(of(true))
    spyOn(helperService,'navigate')
    component.addPerson()
    fixture.detectChanges()
    expect(personService.addPerson).toHaveBeenCalledWith(component.orgId,component.person)
    expect(helperService.navigate).toHaveBeenCalledWith("org/"+component.orgId+'/users')
  })

});
describe('PersonAddComponent', () => {
  let component: PersonAddComponent;
  let fixture: ComponentFixture<PersonAddComponent>;
  let activatedRoute:ActivatedRoute;
  let personService:PersonService;
  let helperService:HelperService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonAddComponent ],
      imports:[RouterTestingModule.withRoutes([{path:'org/:id/users',component:PersonComponent}]),FormsModule,HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonAddComponent);
    activatedRoute=TestBed.inject(ActivatedRoute)
    personService=TestBed.inject(PersonService);
    helperService=TestBed.inject(HelperService);  
    activatedRoute.snapshot.params={'orgId':'0','id':'0'}

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isEdit).toBe(true)
  });
  it('should model bind with input field',()=>{
    component.person.name="Arshak"
    component.person.address="test"
    component.person.age=25;
    fixture.detectChanges()
    const compile = fixture.debugElement.nativeElement;
    const inputs=compile.querySelectorAll('.org-add-form input ')
   expect(inputs[0].getAttribute('ng-reflect-model')).toBe("Arshak")
   expect(inputs[1].getAttribute('ng-reflect-model')).toBe("test")
   expect(inputs[2].getAttribute('ng-reflect-model')).toBe("25")
  })
  it('should add and route on btn click',()=>{
    spyOn(component ,'addPerson')
    fixture.detectChanges()
    const compile = fixture.debugElement.nativeElement;
    const btn=compile.querySelector('.org-add-form button')
    btn.click()
    fixture.detectChanges()
    expect(component.addPerson).toHaveBeenCalled()

  })
  it('should add person ',()=>{ 
    spyOn(personService,'editPerson').and.returnValue(of(true))
    spyOn(helperService,'navigate')
    component.addPerson()
    fixture.detectChanges()
    expect(personService.editPerson).toHaveBeenCalledWith(component.person)
    expect(helperService.navigate).toHaveBeenCalledWith("org/"+component.orgId+'/users')
  })

});
