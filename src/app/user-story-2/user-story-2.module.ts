import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugFormComponent } from './bug-form/bug-form.component';



@NgModule({
  declarations: [BugFormComponent],
  imports: [
    CommonModule
  ],
  exports:[BugFormComponent]
})
export class UserStory2Module { }
