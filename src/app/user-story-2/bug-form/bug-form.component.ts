import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms"
import { Bugs } from '../../interfaces/bugs'
import { PostBugService } from '../../services/ust2-services/post-bug.service'

@Component({
  selector: 'codehub-bug-form',
  templateUrl: './bug-form.component.html',
  styleUrls: ['./bug-form.component.scss']
})
export class BugFormComponent implements OnInit {
  
  bugForm!: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private postService: PostBugService) { }

  ngOnInit(): void {
    this.bugForm = this.fb.group ({
      title: [null, Validators.required],
      description: [null, Validators.required],
      priority: [null, Validators.required],
      reporter: [null, Validators.required],
      status: []
    })

    this.bugForm.controls.reporter.valueChanges.subscribe( (value) => {
      const statusControl = this.bugForm.controls.status;
      if (value === '•QA') {
        statusControl.setValidators(Validators.required);
      } else {
        statusControl.clearValidators();
      }
      statusControl.updateValueAndValidity();
    })

  }

  submitForm(){
    if (this.bugForm.invalid) {
      this.submitted = true;
      return;
    }else {
      let bugCreated: Bugs = this.bugForm.value
      let bugCreatedId: string;
      this.postService.postBugs(bugCreated).subscribe(value => {
        console.log(value.id);
        bugCreatedId = value.id;
      });
    }
  }

}
