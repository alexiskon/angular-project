import { Component, OnInit } from '@angular/core';
import { Bugs } from '../../interfaces/bugs'
import { faSortNumericDown } from '@fortawesome/free-solid-svg-icons';
import { faSortAlphaUp } from '@fortawesome/free-solid-svg-icons';
import { faSortNumericUp } from '@fortawesome/free-solid-svg-icons';
import { faSort, faArrowAltCircleLeft, faArrowAltCircleRight, faSortAlphaDown } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { GetBugByIdService } from 'src/app/services/get-bug-by-id.service';
import { DeleteBugService } from 'src/app/services/delete-bug.service';
import { UrlConstructor } from 'src/app/services/url-constructor';
import { identifierModuleUrl } from '@angular/compiler';


@Component({
  selector: 'codehub-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.scss']
})
export class GetDataComponent implements OnInit {

  constructor(private route: ActivatedRoute, private getBugById: GetBugByIdService,
    private router: Router, private delBug: DeleteBugService, private urlC: UrlConstructor) { }

  // Font Awesome Icons
  sortAlphabeticalDownIcon = faSortAlphaDown;
  sortNumberDownIcon = faSortNumericDown;
  sortAlphabeticalUpIcon = faSortAlphaUp;
  sortNumberUpIcon = faSortNumericUp;
  sortDateIcon = faSort;
  pageBtnRight = faArrowAltCircleRight;
  pagebtnLeft = faArrowAltCircleLeft;

  //Search properties
  titleSearch: string = "";
  prioritySearch: string = "";
  dateSearch: string = "";
  reporterSearch: string = "";
  statusSearch: string = "";

  searchRequest() {
    this.pageNumber = 0;
    this.nextPageCheck();
    this.urlC.urlResults(this.pageNumber, this.pageSize, false, "", this.titleSearch, this.prioritySearch, this.reporterSearch, this.statusSearch)
      .subscribe(data => {
        this.bugs = data;
      })
  }


  // if counter[i] == 0 the icon that shows the 
  // sort direction(asc,desc) is not displayed  
  counters: number[] = [0, 0, 0, 0, 0];
  bugs: Bugs[] = [];
  value: string = "";
  // sortDesc[i] is true when the i-th header is sorted descendingly
  // [0:title, 1:priority, 2:reporter, 3:createdAt, 4:status]
  sortDesc: boolean[] = [false, true, false, true, false];
  sortDescIndex: number = 0;//sorted paging help variable


  cameFromForm: boolean = false;
  temp: string = "";

  //paging variables
  pageNumber: number = 0;
  pageSize: number = 10;



  ngOnInit(): void {

    if (!(this.route.snapshot.queryParamMap.get('id') === null)) {
      this.cameFromForm = true;
      this.route.queryParams.subscribe(value => {
        this.temp = value.id;
      })
    }

    if (this.cameFromForm) {
      // this.clearParams();
      this.getBugById.getBugById(this.temp).subscribe(data => {
        this.bugs.push(data);
      })
    }
    //starting screen bugs table
    this.urlC.urlResults(this.pageNumber, this.pageSize, false, "", this.titleSearch, this.prioritySearch, this.reporterSearch, this.statusSearch)
      .subscribe((data) => {
        data.map((it) => {
          if (it.id === this.temp) {
            return;
          } else {
            this.bugs.push(it)
          }
        })
      })
  }

  getHeader(event: Event): void {
    // We get table header id(e.g. "title") from html 
    this.value = (event.target as Element).id;
    this.pageNumber = 0;
    // According to the id we send a request to the API and we get the sorted
    // data from url?sort=${id},${order} where order is by default ascending
    // for alphabetical values, descending for priority to show the most 
    // important first and date from newest to oldest
    // except for the time when we click multiple times the header so in this 
    // case we inverse the order. If another header is clicked, then the order  
    // of the other tabs are changed back to ascending.

    if (this.value == 'title') {
      this.counters = [1, 0, 0, 0, 0];
      this.bugs = [];
      this.urlC.urlResults(this.pageNumber, this.pageSize, this.sortDesc[0], this.value, this.titleSearch, this.prioritySearch, this.reporterSearch, this.statusSearch).subscribe((data) => {
        data.map((it) => {
          this.bugs.push(it)
        })
      })
      this.sortDesc = [!this.sortDesc[0], true, false, true, false];
    } else if (this.value == 'priority') {
      this.counters = [0, 1, 0, 0, 0];
      this.bugs = [];
      this.urlC.urlResults(this.pageNumber, this.pageSize, this.sortDesc[1], this.value, this.titleSearch, this.prioritySearch, this.reporterSearch, this.statusSearch).subscribe((data) => {
        data.map((it) => {
          this.bugs.push(it)
        })
      })
      this.sortDesc = [false, !this.sortDesc[1], false, true, false];

    } else if (this.value == 'reporter') {
      this.counters = [0, 0, 1, 0, 0];
      this.bugs = [];
      this.urlC.urlResults(this.pageNumber, this.pageSize, this.sortDesc[2], this.value, this.titleSearch, this.prioritySearch, this.reporterSearch, this.statusSearch).subscribe((data) => {
        data.map((it) => {
          this.bugs.push(it)
        })
      })
      this.sortDesc = [false, true, !this.sortDesc[2], true, false];

    } else if (this.value == 'createdAt') {
      this.counters = [0, 0, 0, 1, 0];
      this.bugs = [];
      this.urlC.urlResults(this.pageNumber, this.pageSize, this.sortDesc[3], this.value, this.titleSearch, this.prioritySearch, this.reporterSearch, this.statusSearch).subscribe((data) => {
        data.map((it) => {
          this.bugs.push(it)
        })
      })
      this.sortDesc = [false, true, false, !this.sortDesc[3], false];

    } else if (this.value == 'status') {
      this.counters = [0, 0, 0, 0, 1];
      this.bugs = [];
      this.urlC.urlResults(this.pageNumber, this.pageSize, this.sortDesc[4], this.value, this.titleSearch, this.prioritySearch, this.reporterSearch, this.statusSearch).subscribe((data) => {
        data.map((it) => {
          this.bugs.push(it)
        })
      })
      this.sortDesc = [false, true, false, true, !this.sortDesc[4]];
    }
  }
  //pass data to the route-needs to ActivatedRoute to the navigated path and this.route.snapshot.queryParamMap.get('id') to get the id
  editBug(item: Bugs) {
    this.router.navigate(["bug_reporting_form"], { queryParams: { id: item.id } })
  }

  deleteBug(item: Bugs) {
    this.bugs = []
    this.delBug.deleteBugs(item.id).subscribe()
    this.counters = [0, 0, 0, 0, 0];
    this.sortDesc = [false, true, false, true, false];
    this.urlC.urlResults(this.pageNumber, this.pageSize, false, this.value, this.titleSearch, this.prioritySearch, this.reporterSearch, this.statusSearch).subscribe((data) => {
      data.map((it) => {
        if (item.id === it.id) {
          return;
        }
        this.bugs.push(it)
      })
    })
  }

  checkForNextPage: boolean = true;

  prevPage() {
    //prevent assigning negative page number
    this.pageNumber--;
    this.checkForNextPage = true;
    this.pageManipulation();
  }

  nextPageCheck() {
    //check if next page has data
    this.urlC.urlResults(this.pageNumber + 1, this.pageSize, false, this.value, this.titleSearch, this.prioritySearch, this.reporterSearch, this.statusSearch)
      .subscribe(data => {
        if (data.length === 0) {
          this.checkForNextPage = false;
        } else {
          this.checkForNextPage = true;
        }
      })
  }

  nextPage() {
    this.pageNumber++;
    this.pageManipulation();
    this.nextPageCheck();
  }

  pageManipulation() {
    this.bugs = [];
    this.cameFromForm = false;
    if (this.value === "") {
      this.urlC.urlResults(this.pageNumber, this.pageSize, false, this.value, this.titleSearch, this.prioritySearch, this.reporterSearch, this.statusSearch)
        .subscribe(data => {
          this.bugs = data;
        })
    } else {
      //find the sortDesc boolean variable
      for (let i = 0; i < this.counters.length; i++) {
        if (this.counters[i] != 0) {
          this.sortDescIndex = i;
        }
      }
      this.urlC.urlResults(this.pageNumber, this.pageSize, !this.sortDesc[this.sortDescIndex], this.value, this.titleSearch, this.prioritySearch, this.reporterSearch, this.statusSearch)
        .subscribe(data => {
          this.bugs = data;
        })
    }
  }

}
