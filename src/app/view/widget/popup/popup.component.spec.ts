import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupComponent } from './popup.component';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit onCancel on onCancelclick call ', () => {
    spyOn(component.onCancel, 'emit');
    component.onCancelClick();
    expect(component.onCancel.emit).toHaveBeenCalled();
  });
  it('should emit onDone on onAddClick call ', () => {
    spyOn(component.onAdd, 'emit');
    component.onAddClick();
    expect(component.onAdd.emit).toHaveBeenCalled();
  });
  it('should show only when enable is true', () => {
    const compile = fixture.debugElement.nativeElement;
    component.enable = false;
    fixture.detectChanges();
    let modal = compile.querySelector('.pop-up-modal');
    let bgColor = compile.querySelector('.mmodal-background');
    expect(modal).toBeNull();
    expect(bgColor).toBeNull();
    component.enable = true;
    fixture.detectChanges();
    modal = compile.querySelector('.pop-up-modal');
    bgColor = compile.querySelector('.mmodal-background');

    expect(modal).toBeTruthy();
    expect(bgColor).toBeTruthy();
  });
  it('should display cancel button if true', () => {
    const compile = fixture.debugElement.nativeElement;
    component.enable = true;
    component.isCancelButton = true;
    fixture.detectChanges();
    let cancelBtn = compile.querySelector('.cancel-btn');
    expect(cancelBtn).toBeTruthy();
    component.isCancelButton = false;
    fixture.detectChanges();
    cancelBtn = compile.querySelector('.cancel-btn');
    expect(cancelBtn).toBeNull();
  });
  it('should call onCancelClick on clicking cancel btn', () => {
    spyOn(component, 'onCancelClick');
    component.enable = true;
    component.isCancelButton = true;
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    let cancelBtn = compile.querySelector('.cancel-btn');
    cancelBtn.click();
    fixture.detectChanges();
    expect(component.onCancelClick).toHaveBeenCalled();
  });
  it('should display add button if true', () => {
    const compile = fixture.debugElement.nativeElement;
    component.enable = true;
    component.isActionButton = true;
    fixture.detectChanges();
    let addBtn = compile.querySelector('.add-btn');
    expect(addBtn).toBeTruthy();
    component.isActionButton = false;
    fixture.detectChanges();
    addBtn = compile.querySelector('.add-btn');
    expect(addBtn).toBeNull();
  });
  it('should call onAddclick on click', () => {
    spyOn(component, 'onAddClick');
    component.enable = true;
    component.isActionButton = true;
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    let addBtn = compile.querySelector('.add-btn');
    addBtn.click();
    fixture.detectChanges();
    expect(component.onAddClick).toHaveBeenCalled();
  });
});
