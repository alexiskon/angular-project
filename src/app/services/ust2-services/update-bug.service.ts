import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bugs } from '../../interfaces/bugs';


@Injectable({
  providedIn: 'root'
})
export class UpdateBugService {

  constructor(private http: HttpClient) { }

  url = 'https://bug-report-system-server.herokuapp.com/bugs'

  updateBugs(id:string, bugs: Bugs): Observable<Bugs> {
    return this.http.put<Bugs>(`${this.url}/${id}`, bugs)
  }


}
