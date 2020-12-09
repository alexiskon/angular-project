import { Component, OnInit } from '@angular/core';
import { Bugs } from '../../interfaces/bugs'
import { Ust1Service } from '../../services/ust1-services/ust1.service';
import { faSortAlphaDown } from '@fortawesome/free-solid-svg-icons';
import { faSortNumericDown } from '@fortawesome/free-solid-svg-icons';
import { faSortAlphaUp } from '@fortawesome/free-solid-svg-icons';
import { faSortNumericUp } from '@fortawesome/free-solid-svg-icons';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { GetSortedDataService } from 'src/app/services/ust1-services/get-sorted-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetBugByIdService } from 'src/app/services/ust2-services/get-bug-by-id.service';


@Component({
  selector: 'codehub-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.scss']
})
export class GetDataComponent implements OnInit {

  // Font Awesome Icons
  sortAlphabeticalDownIcon = faSortAlphaDown;
  sortNumberDownIcon = faSortNumericDown;
  sortAlphabeticalUpIcon = faSortAlphaUp;
  sortNumberUpIcon = faSortNumericUp;
  sortDateIcon = faSort;

  // if counter[i] == 0 the icon that shows the 
  // sort direction(asc,desc) is not displayed  
  counters: number[] = [0, 0, 0, 0, 0];
  bugs: Bugs[] = [];
  cameFromForm: boolean = false;
  newBug!: Bugs;
  // sortDesc[i] is true when the i-th header is sorted descendingly
  // [0:title, 1:priority, 2:reporter, 3:createdAt, 4:status]
  sortDesc: boolean[] = [false, true, false, true, false];
  constructor(private ust1: Ust1Service, private getSortedService: GetSortedDataService,
    private route: ActivatedRoute, private getBugById: GetBugByIdService, private router: Router) { }

  ngOnInit(): void {
    let temp: string = "";
    // If queryParams contain an id then first display in the table 
    //the bug with this id, else render the default table
    if (!(this.route.snapshot.queryParamMap.get('id') == null)) {
      this.cameFromForm = true;
      this.route.queryParams.subscribe(p => {
        temp = p.id;
      })
    }
    if (this.cameFromForm) {
      this.clearParams();
      this.getBugById.getBugById(temp).subscribe(data => {
        this.bugs.push(data)
      })
    }
    this.ust1.getBugs().subscribe((data) => {
      data.map((it) => {
        if (it.id === temp) return;
        this.bugs.push(it)
      })
    })
  }

  clearParams() {
    this.router.navigate(
      ['.'],
      { relativeTo: this.route }
    );
  }

  getHeader(event: Event): void {
    // We get table header id(e.g. "title") from html 
    let value: string = (event.target as Element).id;
    this.cameFromForm = false;
    // According to the id we send a request to the API and we get the sorted
    // data from url?sort=${id},${order} where order is by default ascending
    // for alphabetical values, descending for priority to show the most 
    // important first and date from newest to oldest
    // except for the time when we click multiple times the header so in this 
    // case we inverse the order. If another header is clicked, then the order  
    // of the other tabs are changed back to ascending.

    if (value == 'title') {
      this.headerHandle(value, 0);
    }
    else if (value == 'priority') {
      this.headerHandle(value, 1);
    }
    else if (value == 'reporter') {
      this.headerHandle(value, 2);
    }
    else if (value == 'createdAt') {
      this.headerHandle(value, 3);
    }
    else if (value == 'status') {
      this.headerHandle(value, 4);
    }
  }

  headerHandle(value: string, index: number) {
    this.bugs = [];
    this.getSortedService.getSortedBugs(value, this.sortDesc[index]).subscribe((data) => {
      data.map((it) => {
        this.bugs.push(it)
      })
    })
    for (let i = 0; i < this.counters.length; i++) {
      if (i == index) {
        this.counters[i] = 1;
        this.sortDesc[i] = !this.sortDesc[index];
      }
      else if (i % 2 == 0) {
        this.counters[i] = 0;
        this.sortDesc[i] = false;
      }
      else {
        this.counters[i] = 0;
        this.sortDesc[i] = true;
      }
    }
  }

  editClicked(bug: Bugs) {
    this.router.navigate(['bug_reporting_form'], { queryParams: { id: bug.id } });
  }
}
