import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgViewComponent } from './org-view.component';
import { OrgPagination } from 'src/app/model/org_model';
import { PaginationEffectModule } from 'pagination-effect-view';
import { OrganisationService } from 'src/app/service/organisation/organisation.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from '../widget/popup/popup.component';
import { OrgAddComponent } from '../org-add/org-add.component';
import { FormsModule } from '@angular/forms';

describe('OrgViewComponent', () => {
  let component: OrgViewComponent;
  let orgService: OrganisationService;
  let fixture: ComponentFixture<OrgViewComponent>;
  const orgList: OrgPagination = {
    page: 1,
    pageSize: 3,
    totalPage: 7,
    data: [
      {
        name: 'Organization 1',
        address: 'Address 1',
        id: '1',
        desc: 'Description 1',
      },
      {
        name: 'Organization 2',
        address: 'Address 2',
        id: '2',
        desc: 'Description 2',
      },
      {
        name: 'Organization 3',
        address: 'Address 3',
        id: '3',
        desc: 'Description 3',
      },
      // Add more objects as needed
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrgViewComponent, PopupComponent, OrgAddComponent],
      imports: [PaginationEffectModule, HttpClientModule, FormsModule],
      providers: [OrganisationService],
    }).compileComponents();

    orgService = TestBed.inject(OrganisationService);
    fixture = TestBed.createComponent(OrgViewComponent);

    component = fixture.componentInstance;
    spyOn(orgService, 'getOrgList').and.returnValue(of(orgList));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get organisation data', () => {
    expect(orgService.getOrgList).toHaveBeenCalled();
    fixture.detectChanges();
    expect(component.orgPagination).toEqual(orgList);
  });
  it('should run addViewMore', () => {
    spyOn(component, 'addViewMore');
    component.getOrgList(1);
    expect(component.addViewMore).toHaveBeenCalled();
  });
  it('should build list with the length of given organisation ', () => {
    expect(component.viewMore.length).toBe(component.orgPagination.data.length);
  });
  it('should display organisation on view', () => {
    const compile = fixture.debugElement.nativeElement;
    const orgTile = compile.querySelector('.tile-container .col-3 h6');
    expect(orgTile.textContent).toBe('1');
  });
  it('should check show more ', () => {
    const compile = fixture.debugElement.nativeElement;
    const showMoreBtn = compile.querySelector('.tile-container .view-button ');
    let expandedTile = compile.querySelector('.expanded-tile .row');
    expect(expandedTile).toBeNull();
    showMoreBtn.click();

    fixture.detectChanges();
    expandedTile = compile.querySelector('.expanded-tile .row');
    expect(expandedTile).toBeTruthy();
    showMoreBtn.click();
    fixture.detectChanges();
    expandedTile = compile.querySelector('.expanded-tile .row');
    expect(expandedTile).toBeNull();
  });
  it('should navigate to user page', () => {
    spyOn(component, 'navTo');
    const compile = fixture.debugElement.nativeElement;
    const getUserBtn = compile.querySelectorAll('.tile-container .col-1  ');

    getUserBtn[1].click();
    fixture.detectChanges();
    expect(component.navTo).toHaveBeenCalledWith('org/1/users');
  });
  it('should navigate to edit User page', () => {
    spyOn(component, 'togglePopUp');
    const compile = fixture.debugElement.nativeElement;
    const getUserBtn = compile.querySelectorAll('.tile-container .col-1  ');

    getUserBtn[2].click();
    fixture.detectChanges();

    expect(component.togglePopUp).toHaveBeenCalledWith(orgList.data[0]);
    // expect(component.popUpEnable).toBe(true)
  });
  it('should toggle popUp', () => {
    component.popUpEnable = false;
    component.togglePopUp();
    setTimeout(() => {
      expect(component.popUpEnable).toBe(true);
      component.togglePopUp();
      setTimeout(() => {
        expect(component.popUpEnable).toBe(false);
      }, 0);
    }, 0);
  });
  it('should call toggle when clicked on add', () => {
    spyOn(component, 'togglePopUp');
    const compile = fixture.debugElement.nativeElement;
    let addButton = compile.querySelector('.addbutton');
    addButton.click();
    fixture.detectChanges();
    expect(component.togglePopUp).toHaveBeenCalledWith();
  });
  it('should call toggle with org object when clicked on edit', () => {
    spyOn(component, 'togglePopUp');
    const compile = fixture.debugElement.nativeElement;
    let addButton = compile.querySelector('.editbutton');
    addButton.click();
    fixture.detectChanges();
    expect(component.togglePopUp).toHaveBeenCalledWith({
      name: 'Organization 1',
      address: 'Address 1',
      id: '1',
      desc: 'Description 1',
    });
  });
  it('Should hide and show alert box with respect to popupenable', () => {
    const compile = fixture.debugElement.nativeElement;
    component.popUpEnable = true;
    fixture.detectChanges();
    let popUp = compile.querySelector('.pop-up-modal');
    console.log(popUp);
    expect(popUp).toBeTruthy();
    component.popUpEnable = false;
    fixture.detectChanges();
    popUp = compile.querySelector('.pop-up-modal');
    expect(popUp).toBeNull();
  });
  it('Should cancel modal on cancel click ', () => {
    spyOn(component, 'togglePopUp');
    const compile = fixture.debugElement.nativeElement;
    component.popUpEnable = true;
    fixture.detectChanges();
    let popUp = compile.querySelector('.pop-up-modal .cancel-btn');
    popUp.click();
    expect(component.togglePopUp).toHaveBeenCalled();
  });
  it('Should add or edit org on click', () => {
    spyOn(component, 'onAddClick');
    const compile = fixture.debugElement.nativeElement;
    component.popUpEnable = true;
    fixture.detectChanges();
    let popUp = compile.querySelector('.pop-up-modal .add-btn');
    popUp.click();
    expect(component.onAddClick).toHaveBeenCalled();
  });
  it('should delete user on click', () => {
    spyOn(component, 'deleteOrg');
    const compile = fixture.debugElement.nativeElement;
    const getUserBtn = compile.querySelectorAll('.tile-container .col-1  ');
    getUserBtn[3].click();
    fixture.detectChanges();
    expect(component.deleteOrg).toHaveBeenCalledWith('1');
  });
  it('should make do true when onAddCalled', () => {
    expect(component.do).toBe(false);
    component.onAddClick();
    expect(component.do).toBe(true);
  });
  it('should call toggle on onerrorclick', () => {
    spyOn(component, 'togglePopUp');
    component.onError('ERROR');
    expect(component.togglePopUp).toHaveBeenCalledWith();
  });
});
