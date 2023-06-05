import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
  @Input() enable: boolean = false;
  @Input() buttonName: string = '';
  @Input() isCancelButton: boolean = false;
  @Input() isActionButton:boolean=true;
  @Output() onAdd = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  onCancelClick() {
    this.onCancel.emit();
  }
  onAddClick() {
    this.onAdd.emit();
  }
}
