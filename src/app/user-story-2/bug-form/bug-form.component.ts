import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { Bugs } from 'src/app/interfaces/bugs';
import { GetBugByIdService } from 'src/app/services/ust2-services/get-bug-by-id.service';
import { PostBugService } from 'src/app/services/ust2-services/post-bug.service';

@Component({
  selector: 'codehub-bug-form',
  templateUrl: './bug-form.component.html',
  styleUrls: ['./bug-form.component.scss']
})
export class BugFormComponent implements OnInit {
  bugForm!: FormGroup;
  submitted: boolean = false;
  btnArrow = faArrowAltCircleRight;

  constructor(private fb: FormBuilder, private postService: PostBugService, private router: Router,
    private route: ActivatedRoute, private getBugById: GetBugByIdService) { }

  ngOnInit(): void {
    let temp: string = "";
    let editClicked: boolean = false
    this.bugForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      priority: [null, Validators.required],
      reporter: [null, Validators.required],
      status: []
    });
    if (!(this.route.snapshot.queryParamMap.get('id') == null)) {
      editClicked = true;
      this.route.queryParams.subscribe(p => {
        temp = p.id;
      })
    }
    if (editClicked) {
      this.getBugById.getBugById(temp).subscribe(it => {
        this.bugForm = this.fb.group({
          title: [it.title, Validators.required],
          description: [it.description, Validators.required],
          priority: [it.priority.toString(), Validators.required],
          reporter: [it.reporter, Validators.required],
          status: [it.status]
        });
        console.log(it.priority)
      })
    }
    // else{}

    this.bugForm.controls.reporter.valueChanges.subscribe
      (value => {
        const statusFormControl = this.bugForm.controls.status;

        if (value === 'QA') {
          statusFormControl.setValidators(Validators.required);
        } else {
          statusFormControl.clearValidators();
        }
        statusFormControl.updateValueAndValidity()

      });
  }

  submitForm() {
    if (this.bugForm.invalid) {
      this.submitted = true;
      return;
    } else {
      let bugCreated: Bugs = this.bugForm.value
      this.postService.postBugs(bugCreated).subscribe(value => {
        this.router.navigate([''], { queryParams: { id: value.id } });
      });
    }
  }
}
