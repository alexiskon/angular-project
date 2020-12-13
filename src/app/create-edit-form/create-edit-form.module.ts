import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugFormComponent } from './bug-form/bug-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BugFormComponent],
  imports: [
    CommonModule,ReactiveFormsModule,FontAwesomeModule, RouterModule
  ],
  exports: [BugFormComponent]
})
export class CreateEditFormModule { }
