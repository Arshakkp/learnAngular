import {
  Component,
  EventEmitter,
  Input,
  OnChanges,

  Output,
  SimpleChanges,
} from '@angular/core';
import { Org } from 'src/app/model/org_model';
import { OrganisationService } from 'src/app/service/organisation/organisation.service';

@Component({
  selector: 'app-org-add',
  templateUrl: './org-add.component.html',
  styleUrls: ['./org-add.component.scss'],
})
export class OrgAddComponent implements OnChanges {
  @Input() org: Org = new Org();
  @Input() do: boolean = false;
  
  @Output() onDone = new EventEmitter();
  @Output() onError = new EventEmitter();

  isLoading: boolean = false;

  constructor(
    private orgFunc: OrganisationService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.do) {
      this.addOrg();
    }
  }


  throwError(error: string) {
    this.onError.emit(error);
  }
  addOrg() {
    try {
      this.isLoading = true;
      if (!(this.org.name && this.org.address && this.org.desc)) {
      

        throw 'Please Enter The Form Completely';
      }
      if (this.org.id) {
      
        this.orgFunc.editOrg(this.org).subscribe((data) => {
          if (data) {
            this.isLoading = false;

    
            this.onDone.emit();
          }
        });
      } else {
      

        this.orgFunc.addOrg(this.org).subscribe((data) => {
          if (data) {
            this.isLoading = false;

            this.onDone.emit();
          }
        });
      }
    } catch (err: any) {
      this.isLoading = false;


      this.throwError(err.toString());
    }
  }
}
