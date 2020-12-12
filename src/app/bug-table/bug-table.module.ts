import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetDataComponent } from './get-data/get-data.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [GetDataComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    
  ],
  exports: [GetDataComponent]
})
export class BugTableModule { }
