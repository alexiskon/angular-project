import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bugs } from '../interfaces/bugs';

@Injectable({
  providedIn: 'root'
})
export class UrlConstructor {

  constructor(private http: HttpClient) { }

  url = 'https://bug-report-system-server.herokuapp.com/bugs'
  urlResults (pageNum: number, pageSize: number, desc?: boolean, header?: string, title?: string | "", priority?: string | "", reporter?: string | "", status?: string | ""): Observable<Bugs[]> {
    let sortOrder = desc  ? 'desc': 'asc'; 
    let headerOrder = header === "" ? "": header + ',' + sortOrder;
 
    return this.http.get<Bugs[]>(`${this.url}?page=${pageNum}&size=${pageSize}
    &title=${title}&priority=${priority}&reporter=${reporter}&status=${status}&sort=${headerOrder}`)
  }

}
