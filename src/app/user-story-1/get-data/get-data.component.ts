import { Component, OnInit } from '@angular/core';
import { Bugs } from '../bugs'
import { Ust1Service } from '../ust1.service';

@Component({
  selector: 'codehub-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.scss']
})
export class GetDataComponent implements OnInit {

  constructor(private ust1: Ust1Service) { }

  bugs: Bugs[] = [];
  titleDesc: boolean = false;
  priorityDesc: boolean = false;
  reporterDesc: boolean = false;
  createdAtDesc: boolean = false;
  statusDesc: boolean = false;


  ngOnInit(): void {
    this.ust1.getBugs().subscribe((data) => {
      data.map((it) => {
        this.bugs.push(it)
      })
    })


//Second way to get bugs from API
    // this.ust1.getBugs().subscribe((data) => {
    //   this.bugs = data.map(it => {
    //     return {
    //       id: it.id,
    //       title: it.title,
    //       description: it.description,
    //       priority: it.priority,
    //       reporter: it.reporter,
    //       status: it.status,
    //       updatedAt: it.updatedAt,
    //       createdAt: it.createdAt,
    //       comments: it.comments
    //     };
    //   })
    // })
  }

  getHeader(event: Event): void { 
    // We get table header id(e.g. "title") from html 
    let value: string = (event.target as Element).id;

    // According to the id we send a request to the API and we get the sorted
    // data from url?sort=${id},${order} where order is by default ascending
    // except for the time when we click multiple times the header so in this 
    // case we inverse the order. If another header is clicked, then the order  
    // of the other tabs are changed back to ascending.

    if (value == 'title') {
      this.bugs = [];
      this.ust1.getSortedBugs(value, this.titleDesc).subscribe((data) => {
        data.map((it) => {
          this.bugs.push(it)
        })
      })
      this.titleDesc = !this.titleDesc
      this.priorityDesc = false;
      this.reporterDesc = false;
      this.createdAtDesc = false;
      this.statusDesc= false;
    }else if (value == 'priority') {
      this.bugs = [];
      this.ust1.getSortedBugs(value, this.priorityDesc).subscribe((data) => {
        data.map((it) => {
          this.bugs.push(it)
        })
      })
      this.priorityDesc = !this.priorityDesc
      this.titleDesc = false;
      this.reporterDesc = false;
      this.createdAtDesc = false;
      this.statusDesc= false;
    }else if (value == 'reporter') {
      this.bugs = [];
      this.ust1.getSortedBugs(value, this.reporterDesc).subscribe((data) => {
        data.map((it) => {
          this.bugs.push(it)
        })
      })
      this.reporterDesc = !this.reporterDesc
      this.titleDesc = false;
      this.priorityDesc = false;
      this.createdAtDesc = false;
      this.statusDesc= false;
    }else if (value == 'createdAt') {
      this.bugs = [];
      this.ust1.getSortedBugs(value, this.createdAtDesc).subscribe((data) => {
        data.map((it) => {
          this.bugs.push(it)
        })
      })
      this.createdAtDesc = !this.createdAtDesc
      this.titleDesc = false;
      this.priorityDesc = false;
      this.reporterDesc = false;
      this.statusDesc= false;
    }else if (value == 'status') {
      this.bugs = [];
      this.ust1.getSortedBugs(value, this.statusDesc).subscribe((data) => {
        data.map((it) => {
          this.bugs.push(it)
        })
      })
      this.statusDesc = !this.statusDesc
      this.titleDesc = false;
      this.priorityDesc = false;
      this.reporterDesc = false;
      this.createdAtDesc = false;
    }
  }
}
