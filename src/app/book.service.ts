import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url = "http://localhost:3000/books"

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]>{

    return this.http.get<Book[]>(this.url)

  }
  save(book:Book): Observable<Book>{
    return this.http.post<Book>(this.url, book);
  }
  delete(book:Book): Observable<void>{
    return this.http.delete<void>(`${this.url}/${book.id}`);
  }
}
