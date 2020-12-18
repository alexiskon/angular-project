import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetDataComponent } from './bug-table/get-data/get-data.component';
import { BugFormComponent } from './create-edit-form/bug-form/bug-form.component';
import { UnsubmittedFormGuard } from './guards/unsubmitted-form.guard';
import { NotFoundPageComponent } from './not-found-page/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '', component: GetDataComponent,
  },
  {
    path: 'bug_reporting_form', component: BugFormComponent,
    canDeactivate: [UnsubmittedFormGuard]
  },
  {
    path: "**", component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
