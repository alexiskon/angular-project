import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bugs } from './bugs'


@Injectable({
  providedIn: 'root'
})
export class Ust1Service {

  constructor(private http: HttpClient) { }

  url = 'https://bug-report-system-server.herokuapp.com/bugs'
  getBugs (): Observable<Bugs[]> {
    return this.http.get<Bugs[]>(this.url);
    
  }
  getSortedBugs (header: string, desc: boolean): Observable<Bugs[]> {
    let sortOrder = desc  ? 'desc': 'asc'; 
    let sortedUrl = this.url + '?sort=' + header + ',' + sortOrder;
    return this.http.get<Bugs[]>(sortedUrl)
  }
}
