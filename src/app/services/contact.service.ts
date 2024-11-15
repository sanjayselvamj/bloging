import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/api/messages'; // Adjust the URL as needed

  constructor(private http: HttpClient) { }

  sendMessage(messageData: any): Observable<any> {
    return this.http.post(this.apiUrl, messageData);
}
}
