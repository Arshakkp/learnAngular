import { Component, OnInit } from '@angular/core';
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
export class PersonAddComponent implements OnInit {
  person: Person = new Person();
  orgId: string = '';
  personId?: string;
  isEdit: boolean = false;
  file?:File;
  constructor(
    private helper: HelperService,
    private personService: PersonService,
    private activatedRoute: ActivatedRoute,

  ) {}
  ngOnInit(): void {
    this.getOrgId();
    this.checkIsEdit();
  }
  generateArray(count: number): number[] {
    return this.helper.generateArray(count);
  }

  navTo(path: string) {
    this.helper.navigate(path);
  }
  addPerson() {
    if(this.file){
this.personService.addPersonsAsfile(this.orgId,this.file).subscribe(
_=> this.navTo('org/' + this.orgId + '/users')
);
return;
    }
    if (this.isEdit) {
      this.personService.editPerson(this.person).subscribe(data=> {
        if (data) {
          this.navTo('org/' + this.orgId + '/users');
        }
      },
      
     );
    } else {
   try{   this.personService
        .addPerson(this.orgId, this.person)
        .subscribe((data) => {
          if (data) {
            this.navTo('org/' + this.orgId + '/users');
          }
        }
      );}catch(err){
        alert(err)
      }
    }
  }

  getOrgId() {
    this.orgId = this.activatedRoute.snapshot.paramMap.get('orgId') ?? '';

    if (!this.orgId) {
      console.error('Id Not Found');
      return;
    }
  }
  getPersonbyId() {
    if (this.personId)
      this.personService.getPersonById(this.personId).subscribe((data) => {
        this.person = data;
      });
  }
  onFileUpload(event:any){
this.file=event.target.files[0]
  }
  checkIsEdit() {
    this.personId =
      this.activatedRoute.snapshot.paramMap.get('id') ?? undefined;
    if (this.personId) {
      this.isEdit = true;
      this.getPersonbyId();
    }
  }
}
