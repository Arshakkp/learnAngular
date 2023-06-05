import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Org } from 'src/app/model/org_model';
import { Person, PersonPagination } from 'src/app/model/person.model';
import { HelperService } from 'src/app/service/helper/helper.service';
import { OrganisationService } from 'src/app/service/organisation/organisation.service';
import { PersonService } from 'src/app/service/person/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  personsPagination = new PersonPagination();
  viewMore: boolean[] = [];
  org: Org = new Org();
  orgId: string = '';
  do:boolean=false;
  enablePopUp:boolean=false;
  person:Person=new Person()
  constructor(
    private helper: HelperService,
    private route: Router,
    private personService: PersonService,
    private orgService: OrganisationService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getIdFromRoute();
  }
  onAddClick(){
    this.do=true;
  }
  togglePopUp(person:Person=new Person(),reload:boolean=false){

    if(this.enablePopUp){
      setTimeout(()=>{
        this.do=false;
        this.enablePopUp=false
        this.person=person
        if(reload){
          this.getPersonById(1)
        }
      },0)
    }
    else{
      setTimeout(()=>{
        this.person=person;
        this.enablePopUp=true;

      },0)
    }
  }
  throwError(error:string){
    alert(error);
    this.togglePopUp()
  }
  getIdFromRoute() {
    this.orgId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    if (this.orgId === '') {
      console.error('Id not recieved');
      return;
    }
    this.getOrgDetails();
    this.getPersonById(1);
  }
  getPersonById(page: number) {
    this.personService.getPeopleByOrg(this.orgId, page).subscribe((data) => {
      this.personsPagination = data;
    });
  }
  editPerson(person: Person) {
    this.personService.editPerson(person).subscribe((data) => {});
  }
  deletePerson(id: string | undefined) {
    if (id)
      this.personService.deletePerson(id).subscribe((data) => {
        this.getPersonById(this.personsPagination.page ?? 1);
      });
  }

  getOrgDetails() {
    if (!this.orgService.getOrgById(this.orgId)) {
      console.error('Organisation Not Found');
      return;
    }
    this.orgService.getOrgById(this.orgId).subscribe((data) => {
      this.org = data ?? {};
    });
  }
  viewMoreClick(i: number) {
    this.viewMore[i] = !this.viewMore[i];
  }

  navTo(path: string) {
    this.helper.navigate(path);
  }
}
