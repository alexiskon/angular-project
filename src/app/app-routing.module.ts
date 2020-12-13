import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetDataComponent } from './bug-table/get-data/get-data.component';
import { BugFormComponent } from './create-edit-form/bug-form/bug-form.component';
import { UnsubmittedFormGuard } from './guards/unsubmitted-form.guard';

const routes: Routes = [
  {
    path: '', component: GetDataComponent,
  },
  {
    path: 'bug_reporting_form', component: BugFormComponent,
    canDeactivate: [UnsubmittedFormGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
