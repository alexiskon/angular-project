import { Injectable } from '@angular/core';
import { Bugs } from '../../interfaces/bugs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostBugService {

  constructor(private http: HttpClient) { }
  url = 'https://bug-report-system-server.herokuapp.com/bugs'

  postBugs(bugs: Bugs): Observable<Bugs> {
    return this.http.post<Bugs>(this.url, bugs)
  }
}
