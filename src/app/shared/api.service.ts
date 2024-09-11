import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl ='https://www.googleapis.com/books/v1/volumes/'
  constructor(private http: HttpClient, ) {}
  getBooks(queryField: string) {
    return this.http.get(
      `https://www.googleapis.com/books/v1/volumes?q=${queryField}&maxResults=39&keyes&key=AIzaSyBaJVF3fvF0xdMRuXH25wDmc9zlSua0kSQ`)
  }
}


