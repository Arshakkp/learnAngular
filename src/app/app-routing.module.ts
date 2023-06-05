import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgViewComponent } from './view/org-view/org-view.component';
import { OrgAddComponent } from './view/org-add/org-add.component';
import { PersonComponent } from './view/person/person.component';
import { PersonAddComponent } from './view/person-add/person-add.component';
import { PersonClassroleComponent } from './view/person-classrole/person-classrole.component';

const routes: Routes = [
{path:"org", component:OrgViewComponent,},
{path:"",redirectTo:"/org",pathMatch:'full'},
{path:"org/:id/users", component:PersonComponent},
{path:":orgId/userrole/:userId/class", component:PersonClassroleComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
