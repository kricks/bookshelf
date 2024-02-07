import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import * as ENV  from '../../environments/environment.development';
import { Book } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  searchVolume(query: string): Observable<Book[]> {
    let url = `${ENV.volume}?q=${query.trim()}`;

    return this.http.get<{items:Book[]}>(url).pipe(
      map((book) => book.items),
      catchError((err) => of(err)));
  }
}
