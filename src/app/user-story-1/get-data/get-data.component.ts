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
  titleDesc: boolean = true;
  priorityDesc: boolean = true;
  reporterDesc: boolean = true;
  createdAtDesc: boolean = true;
  statusDesc: boolean = true;


  ngOnInit(): void {
    this.ust1.getBugs().subscribe((data) => {
      data.map((it) => {
        this.bugs.push(it)
      })
    })
  }
  getHeader(event: any) { 
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    if (value == 'title') {
      this.bugs = [];
      this.ust1.getSortedBugs(value, this.titleDesc).subscribe((data) => {
        data.map((it) => {
          this.bugs.push(it)
        })
      })
      this.titleDesc = !this.titleDesc
      this.priorityDesc = true;
      this.reporterDesc = true;
      this.createdAtDesc = true;
      this.statusDesc= true;
    }else if (value == 'priority') {
      this.bugs = [];
      this.ust1.getSortedBugs(value, this.priorityDesc).subscribe((data) => {
        data.map((it) => {
          this.bugs.push(it)
        })
      })
      this.priorityDesc = !this.priorityDesc
      this.titleDesc = true;
      this.reporterDesc = true;
      this.createdAtDesc = true;
      this.statusDesc= true;
    }else if (value == 'reporter') {
      this.bugs = [];
      this.ust1.getSortedBugs(value, this.reporterDesc).subscribe((data) => {
        data.map((it) => {
          this.bugs.push(it)
        })
      })
      this.reporterDesc = !this.reporterDesc
      this.titleDesc = true;
      this.priorityDesc = true;
      this.createdAtDesc = true;
      this.statusDesc= true;
    }else if (value == 'createdAt') {
      this.bugs = [];
      this.ust1.getSortedBugs(value, this.createdAtDesc).subscribe((data) => {
        data.map((it) => {
          this.bugs.push(it)
        })
      })
      this.createdAtDesc = !this.createdAtDesc
      this.titleDesc = true;
      this.priorityDesc = true;
      this.reporterDesc = true;
      this.statusDesc= true;
    }else if (value == 'status') {
      this.bugs = [];
      this.ust1.getSortedBugs(value, this.statusDesc).subscribe((data) => {
        data.map((it) => {
          this.bugs.push(it)
        })
      })
      this.statusDesc = !this.statusDesc
      this.titleDesc = true;
      this.priorityDesc = true;
      this.reporterDesc = true;
      this.createdAtDesc = true;
    }
  }
}
