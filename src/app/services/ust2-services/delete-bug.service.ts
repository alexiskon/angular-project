import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bugs } from 'src/app/interfaces/bugs';

@Injectable({
  providedIn: 'root'
})
export class DeleteBugService {

  constructor(private http: HttpClient) { }
  url = 'https://bug-report-system-server.herokuapp.com/bugs'

  deleteBugs (id: string): Observable<Bugs> {
    return this.http.delete<Bugs>(`${this.url}/${id}`)
  }
}
