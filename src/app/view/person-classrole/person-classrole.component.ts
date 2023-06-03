import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { stdAndRole } from 'src/app/model/classAndRole.model';
import { Standard } from 'src/app/model/classes.model';
import { Role } from 'src/app/model/role.model';
import { ClassService } from 'src/app/service/class/class.service';
import { HelperService } from 'src/app/service/helper/helper.service';
import { RoleService } from 'src/app/service/role/role.service';

@Component({
  selector: 'app-person-classrole',
  templateUrl: './person-classrole.component.html',
  styleUrls: ['./person-classrole.component.scss'],
})
export class PersonClassroleComponent implements OnInit {
  userId: string | undefined;
  orgId: string | null = null;
  stdId: string[] = [];
  roleId: string[] = [];
  selectedRoleAndClass: stdAndRole[] = [];
  saveRoleAndClass: stdAndRole[] = [];
  roles: Role[] = [];
  stds: Standard[] = [];
  dropList: number = 1;
  file?: File;
  constructor(
    private helper: HelperService,
    private stdService: ClassService,
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getStandardAndRole();
    this.getUserId();
  }
  downloadRoleAndClass(){
    if(this.userId)
    this.stdService.downloadClassesAndRoleFile(this.userId);
  }
  getUserId() {
    this.userId = this.activatedRoute.snapshot.paramMap.get('userId') ?? '';
    this.orgId = this.activatedRoute.snapshot.paramMap.get('orgId');
    if (!this.userId) {
      alert('User Id Not Found');
    }
    this.getClassAndRole();
  }
  getStdById(id: string): Standard | undefined {
    console.log(id);
    // console.log(this.stds.find(item=>item.id==id))
    return this.stds.find((item) => item.id == id);
  }
  getRoleById(id: string): Role | undefined {
    return this.roles.find((item) => item.id == id);
  }
  getClassAndRole() {
    if (this.userId)
      this.stdService.getClassesAndRole(this.userId).subscribe((data) => {
        this.saveRoleAndClass = data;
        console.log(this.saveRoleAndClass);
      });
  }
  addClassRole() {
    if (this.file && this.userId) {
      this.stdService
        .addClassAndRoleThroughFile(this.userId, this.file)
        .subscribe((data) => {
          if (data) {
            this.navTo(`org/${this.orgId}/users`);
          }
          return;
        });
    }

    if (this.userId)
      this.stdService
        .addClassAndRole(this.userId, this.selectedRoleAndClass)
        .subscribe((data) => {
          if (data) {
            this.navTo(`org/${this.orgId}/users`);
          }
          return;
        });
  }
  navTo(route: string) {
    this.helper.navigate(route);
  }
  generateArray(count: number): number[] {
    return this.helper.generateArray(count);
  }
  onDrpdwnDone() {
    if (this.stdId[this.dropList - 1] && this.roleId[this.dropList - 1]) {
      this.addIfSelected();
    }
  }

  addIfSelected() {
    let flag: boolean = false;
    this.selectedRoleAndClass.forEach((item) => {
      if (item.stdId && item.stdId == this.stdId[this.dropList - 1]) {
        alert('this class is already taken');
        flag = true;
        return;
      }
    });
    this.saveRoleAndClass.forEach((value) => {
      if (value.stdId && value.stdId == this.stdId[this.dropList - 1]) {
        alert('this class is already taken');
        flag = true;
        return;
      }
    });
    if (flag) {
      return;
    }
    let stdIndex = this.stds.findIndex(
      (item) => item.id == this.stdId[this.dropList - 1]
    );
    let roleIndex = this.roles.findIndex(
      (item) => item.id == this.roleId[this.dropList - 1]
    );

    if (stdIndex > -1 && roleIndex > -1) {
      if (this.userId) {
        this.selectedRoleAndClass.push({
          userId: parseInt(this.userId, 10),
          roleId: this.roles[roleIndex].id,
          stdId: this.stds[stdIndex].id,
        });
        this.dropList++;
      }
    }
  }
  fileUpload(event: any) {
    this.file = event.target.files[0];
  }
  getStandardAndRole() {
    this.stdService.getClasses().subscribe((data) => {
      this.stds = data;
    });
    this.roleService.GetRole().subscribe((data) => {
      this.roles = data;
    });
  }
}
