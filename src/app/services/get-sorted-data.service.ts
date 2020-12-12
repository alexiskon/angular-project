import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bugs } from '../interfaces/bugs';

@Injectable({
  providedIn: 'root'
})
export class GetSortedDataService {

  constructor(private http: HttpClient) { }
  url = 'https://bug-report-system-server.herokuapp.com/bugs'

  getSortedBugs (header: string, desc: boolean, pageNum: number,pageSize: number): Observable<Bugs[]> {
    let sortOrder = desc  ? 'desc': 'asc'; 
    let sortedUrl = `${this.url}?sort=${header},${sortOrder}&page=${pageNum}&size=${pageSize}`;
    return this.http.get<Bugs[]>(sortedUrl)
  }
}
