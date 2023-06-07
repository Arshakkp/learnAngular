import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonClassroleComponent } from './person-classrole.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/app/service/class/class.service';
import { RoleService } from 'src/app/service/role/role.service';
import { Standard } from 'src/app/model/classes.model';
import { of } from 'rxjs';
import { Role } from 'src/app/model/role.model';
import { stdAndRole } from 'src/app/model/classAndRole.model';
import { HelperService } from 'src/app/service/helper/helper.service';

describe('PersonClassroleComponent', () => {
  let component: PersonClassroleComponent;
  let fixture: ComponentFixture<PersonClassroleComponent>;
  let activatedRoute: ActivatedRoute;
  let stdService: ClassService;
  let helperService: HelperService;
  let roleService: RoleService;
  let standards: Standard[] = [
    { id: '1', std: 'First Standard' },
    { id: '2', std: 'Second Standard' },
    { id: '3', std: 'Third Standard' },
  ];
  const stdAndRoleList: stdAndRole[] = [
    { userId: 1, roleId: 'admin', stdId: '1', id: '1' },
    { userId: 2, roleId: 'manager', stdId: '2', id: '2' },
    { userId: 3, roleId: 'employee', stdId: '3', id: '3' },
  ];
  const roleList: Role[] = [
    { id: '1', role: 'Admin' },
    { id: '2', role: 'Manager' },
    { id: '3', role: 'Employee' },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonClassroleComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonClassroleComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    stdService = TestBed.inject(ClassService);
    roleService = TestBed.inject(RoleService);
    helperService = TestBed.inject(HelperService);
    activatedRoute.snapshot.params = { userId: '0', orgId: '0' };
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should call getStandardAndRole', () => {
    spyOn(component, 'getClassAndRole');
    fixture.detectChanges();
    expect(component.getClassAndRole).toHaveBeenCalled();
    // expect(component.getUserId).toHaveBeenCalled()
  });
  it('should get org id and user id from url', () => {
    spyOn(component, 'getClassAndRole');
    component.getUserId();
    fixture.detectChanges();
    expect(component.userId).toBe('0');
    expect(component.orgId).toBe('0');
    expect(component.getClassAndRole).toHaveBeenCalled();
  });
  it('should get class and role service', () => {
    spyOn(stdService, 'getClassesAndRole').and.returnValue(of(stdAndRoleList));
    component.getClassAndRole();
    fixture.detectChanges();
    expect(component.saveRoleAndClass).toEqual(stdAndRoleList);
    expect(stdService.getClassesAndRole).toHaveBeenCalledWith('0');
  });
  it('should call the add class and role service throgh form', () => {
    fixture.detectChanges();
    spyOn(stdService, 'addClassAndRole').and.returnValue(of(true));
    spyOn(helperService, 'navigate');
    component.addClassRole();
    component.userId = '1';
    fixture.detectChanges();
    expect(stdService.addClassAndRole).toHaveBeenCalled();
    expect(helperService.navigate).toHaveBeenCalledWith('org/0/users');
  });
  it('should call the add class and role service throgh file', () => {
    fixture.detectChanges();
    spyOn(stdService, 'addClassAndRoleThroughFile').and.returnValue(of(true));
    spyOn(helperService, 'navigate');
    component.file = new File([''], 'file.csv');
    component.addClassRole();
    fixture.detectChanges();
    expect(stdService.addClassAndRoleThroughFile).toHaveBeenCalled();
    expect(helperService.navigate).toHaveBeenCalledWith('org/0/users');
  });
  it('should call getuserid', () => {
    spyOn(component, 'getUserId');
    fixture.detectChanges();
    expect(component.getUserId).toHaveBeenCalled();
  });
  it('should run download service function', () => {
    fixture.detectChanges();
    spyOn(stdService, 'downloadClassesAndRoleFile');
    component.downloadRoleAndClass();
    expect(stdService.downloadClassesAndRoleFile).toHaveBeenCalled();
  });
  it('should return std and roles', () => {
    spyOn(stdService, 'getClasses').and.returnValue(of(standards));
    spyOn(roleService, 'GetRole').and.returnValue(of(roleList));
    component.getStandardAndRole();
    expect(stdService.getClasses).toHaveBeenCalled();
    expect(roleService.GetRole).toHaveBeenCalled();
    expect(component.stds).toEqual(standards);
    expect(component.roles).toEqual(roleList);
  });
  it('should set isDropDown give bool value', () => {
    expect(component.isDropdown).toBe(true);
    component.setIsDropDown(false);
    fixture.detectChanges();
    setTimeout(() => {
      expect(component.isDropdown).toBe(false);
    }, 0);
  });
  it('should generate array with the given length', () => {
    expect(component.generateArray(7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
  it('should add dropdown and add std and role to list ', () => {
    component.stdId = ['1', '2'];
    component.roleId = ['1', '2'];
    component.dropList = 2;
    component.stds = standards;
    component.userId = '1';
    component.roles = roleList;
    let data = {
      userId: parseInt(component.userId, 10),
      roleId: '2',
      stdId: '2',
    };
    component.addIfSelected();
    fixture.detectChanges();
    expect(component.selectedRoleAndClass).toEqual([data]);
  });
  it('should add dropdown and add std and role to list selected an existing data ', () => {
    component.stdId = ['1', '2'];
    component.roleId = ['1', '2'];
    component.dropList = 2;
    component.stds = standards;
    component.userId = '1';
    component.roles = roleList;

    let data = {
      userId: parseInt(component.userId, 10),
      roleId: '2',
      stdId: '2',
    };
    component.selectedRoleAndClass = [data];
    component.addIfSelected();
    fixture.detectChanges();
    expect(component.selectedRoleAndClass).toEqual([data]);
  });
  it('should call navTo on back button click', () => {
    spyOn(component, 'navTo');
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const backbutton = compile.querySelector('.backbutton');
    const event = new Event('click');
    backbutton.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.navTo).toHaveBeenCalledWith('org/0/users');
  });
  it('should download file on clicked', () => {
    spyOn(component, 'downloadRoleAndClass');
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const downloadButton = compile.querySelector('.downloadbutton');
    downloadButton.click();
    fixture.detectChanges();
    expect(component.downloadRoleAndClass).toHaveBeenCalled();
  });
  it('should show table only if role and and class exist', () => {
    component.saveRoleAndClass = stdAndRoleList;
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    let table = compile.querySelector('.table');
    fixture.detectChanges();
    expect(table).toBeTruthy();
    component.saveRoleAndClass = [];
    fixture.detectChanges();
    table = compile.querySelector('.table');
    expect(table).toBeNull();
  });
  it('should toggle csv import and dropdown based on selected radio button', () => {
    spyOn(component, 'setIsDropDown');

    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const dropdownRadioButton = compile.querySelector('.dropDownselect');
    const csvdropdwonRadioButton = compile.querySelector('.csvimportselect');
    const event = new Event('change');
    dropdownRadioButton.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.setIsDropDown).toHaveBeenCalledWith(true);
    setTimeout(() => {
      expect(component.isDropdown).toBe(true);
    }, 0);
    csvdropdwonRadioButton.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.setIsDropDown).toHaveBeenCalledWith(false);
  });
  it('should show dropdown and csv depending on value', () => {
    const complie = fixture.debugElement.nativeElement;

    component.isDropdown = true;
    fixture.detectChanges();
    let dropdownform = complie.querySelector('.dropdownform');
    let csvform = complie.querySelector('.csvform');
    expect(dropdownform).toBeTruthy();
    expect(csvform).toBeNull();
    component.isDropdown = false;
    fixture.detectChanges();
    dropdownform = complie.querySelector('.dropdownform');
    csvform = complie.querySelector('.csvform');
    expect(dropdownform).toBeNull();
    expect(csvform).toBeTruthy();
  });
  it('should bind dropdown to data', () => {
    component.stdId = ['1'];
    component.roleId = ['1'];
    fixture.detectChanges();
    const complile = fixture.debugElement.nativeElement;
    const roleDropdown = complile.querySelector('.roledropdown');
    const stdDropdown = complile.querySelector('.stddropdown');
    expect(roleDropdown.getAttribute('ng-reflect-model')).toBe('1');
    expect(stdDropdown.getAttribute('ng-reflect-model')).toBe('1');
  });
  it('should add to list function when clicked on add', () => {
    spyOn(component, 'addIfSelected');
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const addButton = compile.querySelector('.addbutton');
    addButton.click();
    expect(component.addIfSelected).toHaveBeenCalled();
  });
  it('should submit on clicking submit', () => {
    spyOn(component, 'addClassRole');
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const submitButton = compile.querySelector('.submitbutton');
    submitButton.click();
    expect(component.addClassRole).toHaveBeenCalled();
  });
});
