import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugFormComponent } from './bug-form/bug-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [BugFormComponent],
  imports: [
    CommonModule,ReactiveFormsModule,FontAwesomeModule
  ],
  exports: [BugFormComponent]
})
export class CreateEditFormModule { }
