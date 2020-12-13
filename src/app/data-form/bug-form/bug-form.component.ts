import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Bugs } from '../../interfaces/bugs'
import { PostBugService } from '../../services/post-bug.service'
import { faArrowAltCircleRight, faHome } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { GetBugByIdService } from 'src/app/services/get-bug-by-id.service';
import { UpdateBugService } from 'src/app/services/update-bug.service';
import { Comments } from 'src/app/interfaces/comments';

@Component({
  selector: 'codehub-bug-form',
  templateUrl: './bug-form.component.html',
  styleUrls: ['./bug-form.component.scss']
})
export class BugFormComponent implements OnInit {

  bugForm!: FormGroup;
  submitted: boolean = false;
  btnArrow = faArrowAltCircleRight;
  homeBtn = faHome;

  editButton: boolean = false;
  temp: string = "";

  //guard variable
  validSubmit: boolean = false;

  constructor(private fb: FormBuilder, private postService: PostBugService, private router: Router,
    private route: ActivatedRoute, private getBugById: GetBugByIdService, private updateBug: UpdateBugService) { }

  //<---------form array builder------------------>
  get comments() {
    return this.bugForm.get("comments") as FormArray;
  }
  private commentItem(desc?: string, name?: string) {
    return this.fb.group({
      description: [desc, Validators.required],
      reporter: [name, Validators.required]
    })
  }
  //<-----------end of formarray builder----------->



  addComment() {
    this.comments.push(this.commentItem())
  }

  removeComment(index: number) {
    this.comments.removeAt(index);
  }
  ngOnInit(): void {

    this.bugForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      priority: [null, Validators.required],
      reporter: [null, Validators.required],
      status: [],
      comments: this.fb.array([])
    })

    let commentValues: Comments[] = [];
    //if edit button is pressed
    if (!(this.route.snapshot.queryParamMap.get('id') == null)) { //check if id exists
      this.editButton = true;
      console.log("test")
      this.route.queryParams.subscribe(value => { //access the id with subscribe
        this.temp = value.id;
      })
    }
    //fill form with the requested for edit data
    if (this.editButton) {
      this.getBugById.getBugById(this.temp).subscribe(data => {
        commentValues = data.comments;
        this.bugForm = this.fb.group({ //get data with id from getBugId
          title: [data.title, Validators.required],
          description: [data.description, Validators.required],
          priority: [data.priority.toString(), Validators.required],
          reporter: [data.reporter, Validators.required],
          status: [data.status],
          comments: this.fb.array([])
        })
        commentValues.forEach(comment => {
          this.comments.push(this.commentItem(comment.description, comment.reporter));
        });
      })
    }
    //if reporter is QA status is required
    this.bugForm.controls.reporter.valueChanges.subscribe((value) => {
      const statusControl = this.bugForm.controls.status;
      if (value === 'QA') {
        statusControl.setValidators(Validators.required);
      } else {
        statusControl.clearValidators();
      }
      statusControl.updateValueAndValidity();
    })

  }



  submitForm() {
    if (this.bugForm.invalid) {
      this.submitted = true;
      return;
    } else {
      this.validSubmit = true;
      let bugCreated: Bugs = this.bugForm.value
      if (this.editButton) {//submited form from edit button
        this.updateBug.updateBugs(this.temp, bugCreated).subscribe(value => {
          console.log(value.id);
          this.router.navigate([""], { queryParams: { id: value.id } })
        });
      }
      else {  //submit form for new entry
        this.postService.postBugs(bugCreated).subscribe(value => {
          console.log(value.id);
          this.router.navigate([""], { queryParams: { id: value.id } })
        });
      }
    }
  }
  canDeactivate = () => {
    if(!this.validSubmit && this.bugForm.dirty){
      return false;
    }
    return true;
  }

  returnHome () {
    this.router.navigate([""])
  }
}
