import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrgViewComponent } from './view/org-view/org-view.component';
import { PaginationEffectModule } from 'pagination-effect-view';
import { OrgAddComponent } from './view/org-add/org-add.component';
import { FormsModule, NgModel } from '@angular/forms';
import { PersonComponent } from './view/person/person.component';
import { PersonAddComponent } from './view/person-add/person-add.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonClassroleComponent } from './view/person-classrole/person-classrole.component';
import { PopupComponent } from './view/widget/popup/popup.component';
@NgModule({
  declarations: [
    AppComponent,
    OrgViewComponent,
    OrgAddComponent,
    PersonComponent,
    PersonAddComponent,
    PersonClassroleComponent,
    PopupComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PaginationEffectModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
