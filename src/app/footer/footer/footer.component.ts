import { Component, OnInit } from '@angular/core';
import {faLinkedin} from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'codehub-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }
  linkedinIcon = faLinkedin;

  ngOnInit(): void {
  }

}
