import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Bugs } from 'src/app/interfaces/bugs';
import { PostBugService } from 'src/app/services/ust2-services/post-bug.service';

@Component({
  selector: 'codehub-bug-form',
  templateUrl: './bug-form.component.html',
  styleUrls: ['./bug-form.component.scss']
})
export class BugFormComponent implements OnInit {
  bugForm: FormGroup;
  submitted:boolean = false;
  bugCreated:Bugs;

  constructor(private fb: FormBuilder,private postService: PostBugService) { }


  ngOnInit(): void {
    this.bugForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      priority: [null, Validators.required],
      reporter: [null, Validators.required],
      status: []
    });

    this.bugForm.get('reporter').valueChanges.subscribe
      (value => {
        const statusFormControl = this.bugForm.get('status');

        if (value === 'QA') {
          statusFormControl.setValidators(Validators.required);
        } else {
          statusFormControl.clearValidators();
        }
        statusFormControl.updateValueAndValidity()

      });
  }


  

submitForm(){
  if (this.bugForm.invalid) {
    this.submitted = true;
    return;
  }

  this.bugCreated.title = this.bugForm.controls.title.value;
  this.bugCreated.description = this.bugForm.controls.description.value;
  this.bugCreated.priority = this.bugForm.controls.priority.value;
  this.bugCreated.reporter = this.bugForm.controls.reporter.value;
  this.bugCreated.status = this.bugForm.controls.status.value;
  this.postService.postBugs(this.bugCreated);
}

}
