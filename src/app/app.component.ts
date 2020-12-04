import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'codehub-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Bug Reporting System';
  public constructor(private titleService: Title) { }
  ngOnInit(): void {
    this.titleService.setTitle(this.title);

  }

  

}
