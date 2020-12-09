import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bugs } from 'src/app/interfaces/bugs';

@Injectable({
  providedIn: 'root'
})
export class PutBugService {

  constructor(private http:HttpClient) { }

  url = 'https://bug-report-system-server.herokuapp.com/bugs'
  putBugs(id: string, bug: Bugs): Observable<Bugs> {
    return this.http.put<Bugs>(this.url + '/' + id, bug);
    // return this.http.put<Bugs>(this.url, bug)
  }
}
