import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgViewComponent } from './org-view.component';
import { Org, OrgPagination } from 'src/app/model/org_model';
import { PaginationEffectComponent, PaginationEffectModule } from 'pagination-effect-view';
import { OrganisationService } from 'src/app/service/organisation/organisation.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('OrgViewComponent', () => {
  let component: OrgViewComponent;
  let orgService:OrganisationService
  let fixture: ComponentFixture<OrgViewComponent>;
  const orgList: OrgPagination = {
    page:1,
    pageSize:3,
    totalPage:7,
    data:[
    {
      name: "Organization 1",
      address: "Address 1",
      id: "1",
      desc: "Description 1"
    },
    {
      name: "Organization 2",
      address: "Address 2",
      id: "2",
      desc: "Description 2"
    },
    {
      name: "Organization 3",
      address: "Address 3",
      id: "3",
      desc: "Description 3"
    },
    // Add more objects as needed
  ]};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgViewComponent ],
      imports:[PaginationEffectModule,HttpClientModule],
      providers:[OrganisationService]
    })
    .compileComponents();
   
    orgService=TestBed.inject(OrganisationService);
    fixture = TestBed.createComponent(OrgViewComponent);
    component = fixture.componentInstance;
    spyOn(orgService,'getOrgList').and.returnValue(of(orgList))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get organisation data',()=>{
  
    expect(orgService.getOrgList).toHaveBeenCalled()
    fixture.detectChanges()
    expect(component.orgPagination).toEqual(orgList);
  
  })
  it('should run addViewMore',()=>{
    spyOn(component,'addViewMore')
    component.getOrgList(1);
    expect(component.addViewMore).toHaveBeenCalled()
  })
  it("should build list with the length of given organisation ",()=>{
expect(component.viewMore.length).toBe(component.orgPagination.data.length)
  })
  it('should display organisation on view',()=>{
const compile = fixture.debugElement.nativeElement
const orgTile = compile.querySelector('.tile-container .col-3 h6');
expect(orgTile.textContent).toBe("1")
  })
  it('should check show more ',()=>{

const compile = fixture.debugElement.nativeElement
const showMoreBtn = compile.querySelector('.tile-container .view-button ');
let expandedTile =compile.querySelector('.expanded-tile .row')
expect(expandedTile).toBeNull()
showMoreBtn.click()

fixture.detectChanges()
expandedTile =compile.querySelector('.expanded-tile .row')
expect(expandedTile).toBeTruthy()
showMoreBtn.click()
fixture.detectChanges()
expandedTile =compile.querySelector('.expanded-tile .row')
expect(expandedTile).toBeNull()

  })
  it('should navigate to user page',()=>{
    spyOn(component,'navTo')
const compile = fixture.debugElement.nativeElement
const getUserBtn = compile.querySelectorAll('.tile-container .col-1  ');

getUserBtn[1].click();
fixture.detectChanges()
expect(component.navTo).toHaveBeenCalledWith('org/1/users')
  })
  it('should navigate to edit User page',()=>{
    spyOn(component,'navTo')
const compile = fixture.debugElement.nativeElement
const getUserBtn = compile.querySelectorAll('.tile-container .col-1  ');
getUserBtn[2].click();
fixture.detectChanges()
expect(component.navTo).toHaveBeenCalledWith('add/org/1')
  })
  it('should navigate to edit User page',()=>{
    spyOn(component,'deleteOrg')
const compile = fixture.debugElement.nativeElement
const getUserBtn = compile.querySelectorAll('.tile-container .col-1  ');
getUserBtn[3].click();
fixture.detectChanges()
expect(component.deleteOrg).toHaveBeenCalledWith('1')
  })
});
