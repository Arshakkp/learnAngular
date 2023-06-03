import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonClassroleComponent } from './person-classrole.component';

describe('PersonClassroleComponent', () => {
  let component: PersonClassroleComponent;
  let fixture: ComponentFixture<PersonClassroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonClassroleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonClassroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
