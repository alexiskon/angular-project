import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowAltCircleRight,faHome } from '@fortawesome/free-solid-svg-icons';
import { Bugs } from 'src/app/interfaces/bugs';
import { FormComponent } from 'src/app/interfaces/form-component';
import { GetBugByIdService } from 'src/app/services/get-bug-by-id.service';
import { PostBugService } from 'src/app/services/post-bug.service';
import { PutBugService } from 'src/app/services/put-bug.service';
import { Comments } from '../../interfaces/comments';

@Component({
  selector: 'codehub-bug-form',
  templateUrl: './bug-form.component.html',
  styleUrls: ['./bug-form.component.scss']
})
export class BugFormComponent implements OnInit, FormComponent {
  bugForm!: FormGroup;
  validSubmit: boolean = false;
  submitted: boolean = false;
  editClicked: boolean = false;
  temp: string = "";

  homeBtn = faHome;
  btnArrow = faArrowAltCircleRight;

  constructor(private fb: FormBuilder, private postService: PostBugService, private router: Router,
    private route: ActivatedRoute, private getBugById: GetBugByIdService, private putBugService: PutBugService) { }

  ngOnInit(): void {
    this.bugForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      priority: [null, Validators.required],
      reporter: [null, Validators.required],
      status: [],
      comments: this.fb.array([])
    });

    let commentValues: Comments[] = [];
    if (!(this.route.snapshot.queryParamMap.get('id') == null)) {
      this.editClicked = true;
      this.route.queryParams.subscribe(p => {
        this.temp = p.id;
      })
    }
    if (this.editClicked) {
      this.getBugById.getBugById(this.temp).subscribe(it => {
        commentValues = it.comments;
        this.bugForm = this.fb.group({
          title: [it.title, Validators.required],
          description: [it.description, Validators.required],
          priority: [it.priority.toString(), Validators.required],
          reporter: [it.reporter, Validators.required],
          status: [it.status],
          comments: this.fb.array([])
        });
        if (commentValues) {
          commentValues.forEach(comment => {
            // console.log("YES")
            this.comments.push(this.commentItem(comment.description, comment.reporter));
          });
        }
      })
    }
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
  canDeactivate = () => {
    if(!this.validSubmit && this.bugForm.dirty){
      console.log(this.validSubmit, this.bugForm.dirty)
      return false;
    }
    return true;
  }

  get comments() {
    // console.log(this.bugForm.get('comments'))
    return this.bugForm.get('comments') as FormArray;
  }

  private commentItem(desc?: string, name?: string) {
    return this.fb.group({
      description: [desc,Validators.required],
      name: [name, Validators.required]
    })
  }

  addComment() {
    this.comments.push(this.commentItem())
  }

  removeComment(index: number) {
    this.comments.removeAt(index);
  }

  submitForm() {
    this.submitted = true;
    if (this.bugForm.invalid) {
      return;
    } else {
      this.validSubmit = true
      if (!this.editClicked) {
        let bugCreated: Bugs = this.bugForm.value
        this.postService.postBugs(bugCreated).subscribe(value => {
          this.router.navigate([''], { queryParams: { id: value.id } });
        });
      }
      else {
        let bugCreated: Bugs = this.bugForm.value
        this.putBugService.putBugs(this.temp, bugCreated).subscribe(value => {
          this.router.navigate([''], { queryParams: { id: value.id } });
        });
      }
    }
  }
  returnHome(){
    console.log("true")
    this.router.navigate(['']);

  }
}
