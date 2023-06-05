import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { stdAndRole } from 'src/app/model/classAndRole.model';
import { Standard } from 'src/app/model/classes.model';
import { Person } from 'src/app/model/person.model';
import { Role } from 'src/app/model/role.model';
import { ClassService } from 'src/app/service/class/class.service';
import { HelperService } from 'src/app/service/helper/helper.service';
import { PersonService } from 'src/app/service/person/person.service';
import { RoleService } from 'src/app/service/role/role.service';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.scss'],
})
export class PersonAddComponent implements OnChanges {
  @Input() person: Person = new Person();
  @Input() do: boolean = false;
  @Output() onError = new EventEmitter<string>();
  @Output() onDone = new EventEmitter();
  @Input() orgId: string = '';
  personId?: string;
  isEdit: boolean = false;
  file?: File;
  constructor(
    private helper: HelperService,
    private personService: PersonService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.do) {
      this.addPerson();
    }
    if (this.person.id) {
      this.isEdit = true;
    }
  }
  generateArray(count: number): number[] {
    return this.helper.generateArray(count);
  }
  throwError(error:string){
    this.onError.emit(error);
  }

  addPerson() {
    try {
      if (this.file) {
        this.personService
          .addPersonsAsfile(this.orgId, this.file)
          .subscribe((_) => this.onDone.emit());
        return;
      }
      if (
        (this.person.name && this.person.address && this.person.age,
        this.person.email)
      ) {
        if (this.isEdit) {
          this.personService.editPerson(this.person).subscribe((data) => {
            if (data) {
              this.onDone.emit();
            }
          });
        } else {
          this.personService
            .addPerson(this.orgId, this.person)
            .subscribe((data) => {
              if (data) {
                this.onDone.emit();
              }
            });
        }
      } else {
        throw 'Please Fill Complete Data';
      }
    } catch (err) {}
  }

  onFileUpload(event: any) {
    this.file = event.target.files[0];
  }
}
