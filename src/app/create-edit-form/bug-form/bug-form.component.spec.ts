import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { BugFormComponent } from './bug-form.component';

describe('BugFormComponent', () => {
  let component: BugFormComponent;
  let fixture: ComponentFixture<BugFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugFormComponent ],
      imports: [ReactiveFormsModule, AppRoutingModule, HttpClientModule]
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugFormComponent);
    component = fixture.componentInstance;
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
  //9-a
  fit('form should be invalid if there are no input data', () => {
    component.initializeForm(null, null, null, null, null);
    expect(component.bugForm.invalid).toBeTruthy();
  })
  //9-b
  fit('the form should be valid by having the minimum required fields', () => {
    component.initializeForm('title', 'description', '1', 'PO', null)
    expect(component.bugForm.valid).toBeTruthy();
  })
  //9-c
  fit('form should be invalid if reporter is QA', () => {
    component.initializeForm('title', 'description', '1', "QA", null)
    fixture.detectChanges();
    expect(component.bugForm.invalid).toBeTruthy();
  })
  //9-d
  fit('form should be valid if reporter is QA', () => {
    component.initializeForm('title', 'description', '1', 'QA', 'Done')
    expect(component.bugForm.valid).toBeTruthy();
  })

});
