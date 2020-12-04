import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetDataComponent } from './get-data/get-data.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [GetDataComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [GetDataComponent]
})
export class UserStory1Module { }
