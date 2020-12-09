import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bugs } from '../../interfaces/bugs';


@Injectable({
  providedIn: 'root'
})
export class GetBugByIdService {

  constructor(private http: HttpClient) { }
  url = 'https://bug-report-system-server.herokuapp.com/bugs'

  getBugById(id: string): Observable<Bugs>{
    return this.http.get<Bugs>(`${this.url}/${id}`)
  }
}
