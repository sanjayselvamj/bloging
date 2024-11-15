import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Comment } from '../models/post.model'; // Ensure correct import
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://localhost:3000'; // Adjust the URL if needed

  constructor(private http: HttpClient) {}

  addComment(commentData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Ensure the request is sent as JSON
    });

    return this.http.post('http://localhost:3000/add', commentData, { headers });
  }



  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/comments/${postId}`);
  }



  // Delete a comment by id
//   deleteComment(commentId: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${commentId}`);
// }


  // Update a comment by id
  updateComment(commentId: number, content: string): Observable<any> {
    const payload = { content };
    return this.http.put(`${this.apiUrl}/${commentId}`, payload);
  }
  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${commentId}`);
  }
}


