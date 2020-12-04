import { Component, OnInit } from '@angular/core';
import { Bugs } from '../../interfaces/bugs'
import { Ust1Service } from '../../services/ust1-services/ust1.service';
import { faSortAlphaDown } from '@fortawesome/free-solid-svg-icons';
import { faSortNumericDown } from '@fortawesome/free-solid-svg-icons';
import { faSortAlphaUp } from '@fortawesome/free-solid-svg-icons';
import { faSortNumericUp } from '@fortawesome/free-solid-svg-icons';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { GetSortedDataService } from 'src/app/services/ust1-services/get-sorted-data.service';


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
  // sortDesc[i] is true when the i-th header is sorted descendingly
  // [0:title, 1:priority, 2:reporter, 3:createdAt, 4:status]
  sortDesc: boolean[]= [false,true,false,true,false];
  constructor(private ust1: Ust1Service, private getSortedService: GetSortedDataService) { }




  ngOnInit(): void {
    this.ust1.getBugs().subscribe((data) => {
      data.map((it) => {
        this.bugs.push(it)
      })
    })
  }

  getHeader(event: Event): void {
    // We get table header id(e.g. "title") from html 
    let value: string = (event.target as Element).id;

    // According to the id we send a request to the API and we get the sorted
    // data from url?sort=${id},${order} where order is by default ascending
    // for alphabetical values, descending for priority to show the most 
    // important first and date from newest to oldest
    // except for the time when we click multiple times the header so in this 
    // case we inverse the order. If another header is clicked, then the order  
    // of the other tabs are changed back to ascending.

    if (value == 'title') {
      this.counters = [1, 0, 0, 0, 0];
      this.bugs = [];
      this.getSortedService.getSortedBugs(value, this.sortDesc[0]).subscribe((data) => {
        data.map((it) => {
          this.bugs.push(it)
        })
      })
      this.sortDesc = [!this.sortDesc[0],true,false,true,false];
    } else if (value == 'priority') {
      this.counters = [0, 1, 0, 0, 0];
      this.bugs = [];
      this.getSortedService.getSortedBugs(value, this.sortDesc[1]).subscribe((data) => {
        data.map((it) => {
          this.bugs.push(it)
        })
      })
      this.sortDesc = [false,!this.sortDesc[1],false,true,false];

    } else if (value == 'reporter') {
      this.counters = [0, 0, 1, 0, 0];
      this.bugs = [];
      this.getSortedService.getSortedBugs(value, this.sortDesc[2]).subscribe((data) => {
        data.map((it) => {
          this.bugs.push(it)
        })
      })
      this.sortDesc = [false,true,!this.sortDesc[2],true,false];

    } else if (value == 'createdAt') {
      this.counters = [0, 0, 0, 1, 0];
      this.bugs = [];
      this.getSortedService.getSortedBugs(value, this.sortDesc[3]).subscribe((data) => {
        data.map((it) => {
          this.bugs.push(it)
        })
      })
      this.sortDesc = [false,true,false,!this.sortDesc[3],false];

    } else if (value == 'status') {
      this.counters = [0, 0, 0, 0, 1];
      this.bugs = [];
      this.getSortedService.getSortedBugs(value, this.sortDesc[4]).subscribe((data) => {
        data.map((it) => {
          this.bugs.push(it)
        })
      })
      this.sortDesc = [false,true,false,true,!this.sortDesc[4]];
    }
  }
}
