import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PersonAddComponent } from '../person-add/person-add.component';
import { PaginationEffectModule } from 'pagination-effect-view';
import { ActivatedRoute } from '@angular/router';
import { OrganisationService } from 'src/app/service/organisation/organisation.service';
import { Org } from 'src/app/model/org_model';
import { PersonService } from 'src/app/service/person/person.service';
import { Person, PersonPagination } from 'src/app/model/person.model';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from '../widget/popup/popup.component';
import { FormsModule } from '@angular/forms';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;
  let activatedRoute :ActivatedRoute;
  let orgService :OrganisationService;
  let personService:PersonService
  let org :Org
  let personList: PersonPagination;
 const  mockActivatedRoute={

 }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonComponent,PopupComponent,PersonAddComponent, ],
      imports:[RouterTestingModule.withRoutes([{path:'add',component:PersonAddComponent}]),PaginationEffectModule,HttpClientModule,FormsModule],
   
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    activatedRoute=TestBed.inject(ActivatedRoute)
    orgService=TestBed.inject(OrganisationService)
    personService=TestBed.inject(PersonService)
    activatedRoute.snapshot.params={'id':'0'}
    component = fixture.componentInstance;
    org={
      id:'0',
      name:"Test",
      address:"demo at 123",
      desc :"For testing purpose"
    }
    personList={page:1,totalPage:3,pageSize:2,data:[{name:"arshak",age:25,orgId:'12',address:"test",id:'0'},
    {name:"sunil",age:26,address:"test123",orgId:'12',id:'1'}]}
    spyOn(personService,'getPeopleByOrg').and.returnValue(of(personList))
    spyOn(orgService,'getOrgById').and.returnValue(of(org))

    
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should check did call org and person service',()=>{
    fixture.detectChanges();
  expect(orgService.getOrgById).toHaveBeenCalled()
  expect(personService.getPeopleByOrg).toHaveBeenCalled()
  })
  it('should check org value',()=>{
    fixture.detectChanges();
    expect(component.org).toEqual(org)
    expect(component.personsPagination).toEqual(personList)
  })
  it('should display org name',()=>{
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement
    const orgName = compile.querySelector('.org-container .diplay-org-name h1').textContent
    expect(orgName).toBe(component.org.name)
  })
  it('should display person list ',()=>{
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement
    const personView =compile.querySelectorAll('.org-container .container .tile-container')
    expect(personView.length).toBe(component.personsPagination.data.length)
  })
  it('should expand on show more click',()=>{
   
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement
    const personView =compile.querySelector('.org-container .container .tile-container .view-button')
    let expandedTile=compile.querySelector('.org-container .container .tile-container .expanded-tile')
    expect(expandedTile).toBeNull()
    personView.click()
    fixture.detectChanges()
    expandedTile=compile.querySelector('.org-container .container .tile-container .expanded-tile')
    expect(expandedTile).not.toBeNull()
 
  })
  it('should  delete on click',()=>{
   spyOn(component,'deletePerson')
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement
    const personView =compile.querySelectorAll('.org-container .container .tile-container .view-button')
    personView[3].click()
    fixture.detectChanges()
    expect(component.deletePerson).toHaveBeenCalledWith('0')
  })
  it('should  nav to edit on click',()=>{
    spyOn(component,'togglePopUp')
     fixture.detectChanges();
     const compile = fixture.debugElement.nativeElement
     const personView =compile.querySelectorAll('.org-container .container .tile-container .view-button')
    
     personView[2].click()
     fixture.detectChanges()
     expect(component.togglePopUp).toHaveBeenCalledWith(personList.data[0]);

   })
   it('should toggle the enablePopUp ',()=>{
    expect(component.enablePopUp).toBe(false)
    component.togglePopUp()
    setTimeout(()=>{
      expect(component.enablePopUp).toBe(true)
     },0)
   })
it('should call navTo on click',()=>{
  spyOn(component ,'navTo')
  const compile = fixture.debugElement.nativeElement
  const backButton =compile.querySelector('.org-container  .bi-arrow-left-square-fill')
  const clickEvent = new Event('click')
  backButton.dispatchEvent(clickEvent)
  fixture.detectChanges()
  expect(component.navTo).toHaveBeenCalledWith('org/')
})
it('should turn do to true ',()=>{
  expect(component.do).toBe(false)
  component.onAddClick();
  expect(component.do).toBe(true)
});
it('should call togglePopUp on error',()=>{
  spyOn(component ,'togglePopUp')
  component.throwError('error');
  expect(component.togglePopUp).toHaveBeenCalledWith()
})
it('should navigate to classes screen',()=>{
  spyOn(component,'navTo')
  fixture.detectChanges();

  const compile = fixture.debugElement.nativeElement
     const personView =compile.querySelectorAll('.org-container .container .tile-container .view-button')
  personView[1].click()  
  expect(component.navTo).toHaveBeenCalledWith(`${org.id}/userrole/${personList.data[0].id}/class`)
})
it('Should hide and show alert box with respect to popupenable', () => {
  const compile = fixture.debugElement.nativeElement;
  component.enablePopUp = true;
  fixture.detectChanges();
  let popUp = compile.querySelector('.pop-up-modal')
  expect(popUp).toBeTruthy();
  component.enablePopUp = false;
  fixture.detectChanges();
  popUp = compile.querySelector('.pop-up-modal');
  expect(popUp).toBeNull();
  
});
it('Should cancel modal on cancel btn clik', () => {
  spyOn(component ,'togglePopUp')
  const compile = fixture.debugElement.nativeElement;
  component.enablePopUp = true;
  fixture.detectChanges();
  let popUp = compile.querySelector('.pop-up-modal')
  expect(popUp).toBeTruthy();
  let popUpcancelbtn = compile.querySelector('.pop-up-modal .cancel-btn');
  popUpcancelbtn.click();
  fixture.detectChanges();
  expect(component.togglePopUp).toHaveBeenCalledWith()
});
it('Should submit modal on Add or edit org button click btn clik', () => {
  spyOn(component ,'onAddClick')
  const compile = fixture.debugElement.nativeElement;
  component.enablePopUp = true;
  fixture.detectChanges();
  let popUp = compile.querySelector('.pop-up-modal')
  expect(popUp).toBeTruthy();
  let popUpAddbtn = compile.querySelector('.pop-up-modal .add-btn');
  popUpAddbtn.click();
  fixture.detectChanges();
  expect(component.onAddClick).toHaveBeenCalledWith()
});
});
