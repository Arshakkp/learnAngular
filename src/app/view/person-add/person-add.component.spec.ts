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
import { SimpleChange, SimpleChanges } from '@angular/core';

describe('PersonAddComponent', () => {
  let component: PersonAddComponent;
  let fixture: ComponentFixture<PersonAddComponent>;

  let personService: PersonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonAddComponent],
      imports: [FormsModule, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonAddComponent);

    personService = TestBed.inject(PersonService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should model bind with input field', () => {
    component.person.name = 'Arshak';
    component.person.address = 'test';
    component.person.age = 25;
    component.person.email = 'arshak@gmail.com';
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const inputs = compile.querySelectorAll('.org-add-form input ');
    expect(inputs[0].getAttribute('ng-reflect-model')).toBe('Arshak');
    expect(inputs[1].getAttribute('ng-reflect-model')).toBe('test');
    expect(inputs[2].getAttribute('ng-reflect-model')).toBe('25');
  });
  it('should add and route on btn click', () => {
    spyOn(component, 'addPerson');
    let changes: SimpleChanges = {};
    component.do = true;
    component.ngOnChanges(changes);
    expect(component.addPerson).toHaveBeenCalled();
  });
  it('should add person and emit on done ', () => {
    component.person.name = 'Arshak';
    component.person.address = 'test';
    component.person.age = 25;
    component.person.email = 'arshak@gmail.com';
    fixture.detectChanges();
    spyOn(personService, 'addPerson').and.returnValue(of(true));
    spyOn(component.onDone, 'emit');
    component.addPerson();
    fixture.detectChanges();
    expect(personService.addPerson).toHaveBeenCalledWith(
      component.orgId,
      component.person
    );
    expect(component.onDone.emit).toHaveBeenCalled();
  });
  it('should add person and emit on error ', () => {
    component.person.name = 'Arshak';
    component.person.address = 'test';
    component.person.age = 25;

    fixture.detectChanges();
    spyOn(personService, 'addPerson').and.returnValue(of(true));
    spyOn(component.onError, 'emit');
    component.addPerson();
    fixture.detectChanges();

    expect(component.onError.emit).toHaveBeenCalledWith(
      'Please Fill Complete Data'
    );
  });
});

describe('PersonAddComponent', () => {
  let component: PersonAddComponent;
  let fixture: ComponentFixture<PersonAddComponent>;

  let personService: PersonService;
  let helperService: HelperService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonAddComponent],
      imports: [FormsModule, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonAddComponent);

    personService = TestBed.inject(PersonService);
    helperService = TestBed.inject(HelperService);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should turn edit to true when id is present', () => {
    component.person.id = '1';
    let changes: SimpleChanges = {};
    component.ngOnChanges(changes);
    expect(component.isEdit).toBe(true);
  });
  it('should model bind with input field', () => {
    component.person.name = 'Arshak';
    component.person.address = 'test';
    component.person.age = 25;
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const inputs = compile.querySelectorAll('.org-add-form input ');
    expect(inputs[0].getAttribute('ng-reflect-model')).toBe('Arshak');
    expect(inputs[1].getAttribute('ng-reflect-model')).toBe('test');
    expect(inputs[2].getAttribute('ng-reflect-model')).toBe('25');
  });
  it('should add when do is true', () => {
    spyOn(component, 'addPerson');
    component.do = true;
    let changes: SimpleChanges = {};
    component.ngOnChanges(changes);
    fixture.detectChanges();
    expect(component.addPerson).toHaveBeenCalled();
  });
  it('should add person and emit ondone ', () => {
    component.person.name = 'Arshak';
    component.person.address = 'test';
    component.person.age = 25;
    component.person.email = 'arshak@gmail.com';
    component.isEdit=true;
    spyOn(personService, 'editPerson').and.returnValue(of(true));
    spyOn(component.onDone,'emit'),
    component.addPerson();
    fixture.detectChanges();
    expect(personService.editPerson).toHaveBeenCalledWith(component.person);
   expect(component.onDone.emit).toHaveBeenCalledWith()
  });
  it('should add person and return error if form not completely filled', () => {
    component.person.name = 'Arshak';
    component.person.address = 'test';
    component.person.age = 25;
    component.isEdit=true;
    spyOn(component.onError,'emit');
    component.addPerson();
    fixture.detectChanges();
    expect(component.onError.emit).toHaveBeenCalledWith('Please Fill Complete Data');
   
  });
});
