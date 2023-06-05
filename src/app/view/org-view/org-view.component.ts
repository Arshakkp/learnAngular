import { Component, OnInit } from '@angular/core';
import { Org, OrgPagination } from 'src/app/model/org_model';
import { ClassService } from 'src/app/service/class/class.service';
import { HelperService } from 'src/app/service/helper/helper.service';
import { OrganisationService } from 'src/app/service/organisation/organisation.service';

@Component({
  selector: 'app-org-view',
  templateUrl: './org-view.component.html',
  styleUrls: ['./org-view.component.scss'],
})
export class OrgViewComponent implements OnInit {
  orgPagination = new OrgPagination();
  popUpEnable: boolean = false;
  do: boolean = false;
  org: Org = new Org();
  viewMore: boolean[] = [];
  constructor(
    private helper: HelperService,
    private orgFunc: OrganisationService
  ) {}
  ngOnInit(): void {
    this.getOrgList(1);
  }
  onError(err: string) {
    alert(err);
    this.togglePopUp();
  }
  getOrgList(page: number) {
    this.orgFunc.getOrgList(page).subscribe((data) => {
      this.orgPagination = data;
    });
    this.addViewMore();
  }
  addViewMore() {
    length = this.orgPagination.data?.length ?? 0;
    for (let i = 0; i < length; i++) {
      this.viewMore.push(false);
    }
  }
  onAddClick() {
    this.do = true;
  }

  togglePopUp(org: Org = new Org(), reload: boolean = false) {
    if (this.popUpEnable) {
      setTimeout(() => {
        this.popUpEnable = false;
        this.do = false;
        this.org = org;
        if (reload) {
          this.getOrgList(1);
        }
      }, 0);
    } else {
      setTimeout(() => {
        this.org = org;
        this.popUpEnable = true;
      }, 0);
    }
  }
  viewMoreClick(i: number) {
    this.viewMore[i] = !this.viewMore[i];
  }
  navTo(path: string) {
    this.helper.navigate(path);
  }
  deleteOrg(id: string | undefined) {
    if (id) {
      console.log(id);
      this.orgFunc.deleteOrg(id).subscribe((data) => {
        if (data) {
          this.getOrgList(this.orgPagination.page ?? 1);
        }
      });
    }
  }
}
