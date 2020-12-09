import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Bugs } from '../../interfaces/bugs'
import { PostBugService } from '../../services/ust2-services/post-bug.service'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { GetBugByIdService } from 'src/app/services/ust2-services/get-bug-by-id.service';
import { UpdateBugService } from 'src/app/services/ust2-services/update-bug.service';

@Component({
  selector: 'codehub-bug-form',
  templateUrl: './bug-form.component.html',
  styleUrls: ['./bug-form.component.scss']
})
export class BugFormComponent implements OnInit {
  
  bugForm!: FormGroup;
  submitted: boolean = false;
  btnArrow = faArrowAltCircleRight;
 
  editButton: boolean = false;
  temp: string = "";


  constructor(private fb: FormBuilder, private postService: PostBugService, private router: Router,
    private route: ActivatedRoute, private getBugById: GetBugByIdService, private updateBug: UpdateBugService) { }

  ngOnInit(): void {

    this.bugForm = this.fb.group ({
      title: [null, Validators.required],
      description: [null, Validators.required],
      priority: [null, Validators.required],
      reporter: [null, Validators.required],
      status: []
    })

    if (!(this.route.snapshot.queryParamMap.get('id') == null)) {
      this.editButton = true;
      console.log("test")
      this.route.queryParams.subscribe(value => {
        this.temp = value.id;
      })      
    }

    if (this.editButton) {
      this.getBugById.getBugById(this.temp).subscribe(data => {
        this.bugForm = this.fb.group ({
          title: [data.title, Validators.required],
          description: [data.description, Validators.required],
          priority: [data.priority.toString(), Validators.required],
          reporter: [data.reporter, Validators.required],
          status: [data.status]
        })
      })
    }

    this.bugForm.controls.reporter.valueChanges.subscribe( (value) => {
      const statusControl = this.bugForm.controls.status;
      if (value === 'QA') {
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
    }else if (this.editButton) {
      let bugCreated: Bugs = this.bugForm.value
      this.updateBug.updateBugs(this.temp, bugCreated).subscribe(value => {
        console.log(value.id);
        this.router.navigate([""], {queryParams: {id: value.id}})
      });
    }
    else {
      let bugCreated: Bugs = this.bugForm.value
      this.postService.postBugs(bugCreated).subscribe(value => {
        console.log(value.id);
        this.router.navigate([""], {queryParams: {id: value.id}})
      });
    }
  }

}
