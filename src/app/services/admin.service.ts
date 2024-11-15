// admin.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  getUserStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-stats`);
  }

  getStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`);
  }

  // Method to get the number of comments for each post
  getCommentsForPosts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/comments-per-post`);
  }
}
