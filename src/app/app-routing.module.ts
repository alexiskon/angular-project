import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetDataComponent } from './user-story-1/get-data/get-data.component';
import { BugFormComponent } from './user-story-2/bug-form/bug-form.component';

const routes: Routes = [
  {
    path: '', component: GetDataComponent,
  },
  {
    path: 'bug_reporting_form', component: BugFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
