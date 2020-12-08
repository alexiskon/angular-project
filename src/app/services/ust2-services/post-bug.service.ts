import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bugs } from 'src/app/interfaces/bugs';

@Injectable({
  providedIn: 'root'
})
export class PostBugService {

  constructor(private http: HttpClient) { }
  url = 'https://bug-report-system-server.herokuapp.com/bugs'
  postBugs(bug: Bugs): void {
    console.log(bug)
    this.http.post(this.url, bug)
  }
}
