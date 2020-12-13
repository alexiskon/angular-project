import { Component, OnInit } from '@angular/core';
import { Bugs } from '../../interfaces/bugs'
import { Ust1Service } from '../../services/ust1.service';
import { faSortAlphaDown } from '@fortawesome/free-solid-svg-icons';
import { faSortNumericDown } from '@fortawesome/free-solid-svg-icons';
import { faSortAlphaUp } from '@fortawesome/free-solid-svg-icons';
import { faSortNumericUp } from '@fortawesome/free-solid-svg-icons';
import { faSort, faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { GetSortedDataService } from 'src/app/services/get-sorted-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetBugByIdService } from 'src/app/services/get-bug-by-id.service';
import { DeleteBugService } from 'src/app/services/delete-bug.service';
import { UrlConstructorService } from 'src/app/services/url-constructor.service';


@Component({
  selector: 'codehub-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.scss']
})
export class GetDataComponent implements OnInit {

  constructor(private ust1: Ust1Service, private getSortedService: GetSortedDataService,
    private route: ActivatedRoute, private getBugById: GetBugByIdService, private router: Router,
    private delBug: DeleteBugService, private urlC: UrlConstructorService) { }

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
      this.getBugById.getBugById(temp).subscribe(data => {
        this.bugs.push(data)
      })
    }
    this.urlC.urlResults(this.pageNumber, this.pageSize, false, "", this.titleSearch, this.prioritySearch, this.reporterSearch, this.statusSearch)
      .subscribe((data) => {
        data.map((it) => {
          if (it.id == temp) {
            this.clearParams();
            return;
          }
          else {
            this.bugs.push(it)
          }
        })
      })
  }


  // Font Awesome Icons
  pageBtnRight = faArrowAltCircleRight;
  pageBtnLeft = faArrowAltCircleLeft;
  sortAlphabeticalDownIcon = faSortAlphaDown;
  sortNumberDownIcon = faSortNumericDown;
  sortAlphabeticalUpIcon = faSortAlphaUp;
  sortNumberUpIcon = faSortNumericUp;
  sortDateIcon = faSort;

  // if counter[i] == 0 the icon that shows the 
  // sort direction(asc,desc) is not displayed  
  titleSearch: string = "";
  prioritySearch: string = "";
  dateSearch: string = "";
  reporterSearch: string = "";
  statusSearch: string = "";

  clearAndInitialize() {
    this.titleSearch = "";
    this.prioritySearch = "";
    this.dateSearch = "";
    this.reporterSearch = "";
    this.statusSearch = "";
    this.searchRequest();
  }

  searchRequest() {
    this.pageNumber = 0;
    this.nextPageCheck();
    this.clearParams();
    this.urlC.urlResults(this.pageNumber, this.pageSize, false, "", this.titleSearch, this.prioritySearch, this.reporterSearch, this.statusSearch)
      .subscribe(data => {
        this.bugs = data;
      })
  }

  counters: number[] = [0, 0, 0, 0, 0];
  bugs: Bugs[] = [];
  cameFromForm: boolean = false;
  newBug!: Bugs;
  pageNumber: number = 0;
  pageSize: number = 10;
  value: string = "";
  sortDescIndex: number = -1;
  checkForNextPage: boolean = true;
  // sortDesc[i] is true when the i-th header is sorted descendingly
  // [0:title, 1:priority, 2:reporter, 3:createdAt, 4:status]
  sortDesc: boolean[] = [false, true, false, true, false];

  clearParams() {
    this.router.navigate(
      ['.'],
      { relativeTo: this.route }
    );
  }

  getHeader(event: Event): void {
    // We get table header id(e.g. "title") from html 
    this.value = (event.target as Element).id;
    this.cameFromForm = false;
    this.pageNumber = 0;
    this.checkForNextPage = true;
    this.clearParams();
    // According to the id we send a request to the API and we get the sorted
    // data from url?sort=${id},${order} where order is by default ascending
    // for alphabetical values, descending for priority to show the most 
    // important first and date from newest to oldest
    // except for the time when we click multiple times the header so in this 
    // case we inverse the order. If another header is clicked, then the order  
    // of the other tabs are changed back to ascending.

    if (this.value == 'title') {
      this.headerHandle(this.value, 0);
    }
    else if (this.value == 'priority') {
      this.headerHandle(this.value, 1);
    }
    else if (this.value == 'reporter') {
      this.headerHandle(this.value, 2);
    }
    else if (this.value == 'createdAt') {
      this.headerHandle(this.value, 3);
    }
    else if (this.value == 'status') {
      this.headerHandle(this.value, 4);
    }
  }

  headerHandle(value: string, index: number) {
    this.bugs = [];
    this.urlC.urlResults(this.pageNumber, this.pageSize, this.sortDesc[index], value, this.titleSearch, this.prioritySearch, this.reporterSearch, this.statusSearch).subscribe((data) => {
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
  deleteBug(item: Bugs) {
    this.bugs = []
    this.delBug.deleteBugs(item.id).subscribe()
    this.cameFromForm = false;
    this.sortDesc = [false, true, false, true, false];
    this.counters = [0, 0, 0, 0, 0];
    this.urlC.urlResults(this.pageNumber, this.pageSize, false, this.value, this.titleSearch, this.prioritySearch, this.reporterSearch, this.statusSearch).subscribe((data) => {
      data.map((it) => {
        if (item.id === it.id) {
          return;
        }
        this.bugs.push(it)
      })
    });
  }


  previousPage() {
    //prevent assigning negative page number
    this.pageNumber--;
    this.checkForNextPage = true;
    this.pageManipulation();
  }

  nextPage() {
    this.pageNumber++;
    this.pageManipulation();
    this.nextPageCheck();
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
