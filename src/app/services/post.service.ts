// src/app/services/post.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, Comment } from '../models/post.model';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  // Ensure this URL matches your backend API
  private apiUrl = 'http://localhost:3000/api/post';
  // Adjust this URL to match your backend endpoint
  private token: string = localStorage.getItem('token') || '';

  constructor(private http: HttpClient) {}

  // Method to get a post by its ID
  getPostById(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${postId}`);
  }
  likePost(postId: number, userId: number) {
    return this.http.post<{ message: string }>(`/like`, { post_id: postId, user_id: userId });
  }

  getLikes(postId: number) {
    return this.http.get<{ like_count: number }>(`/likes/${postId}`);
  }

  // Fetch whether the user has liked a post
  hasLiked(postId: number, userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/like/${postId}/user/${userId}`);
  }

  // Create a post with FormData
  createPost(formData: FormData): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, formData);
  }

  // Get all posts
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  // Get comments for a specific post
  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${postId}/comments`);
  }
// CommentService
addComment(postId: number, username: string, content: string, options?: { headers: HttpHeaders }): Observable<Comment> {
  const commentData = { postId, username, content };
  return this.http.post<Comment>('http://localhost:3000/comments', commentData, options);
}
// In post.service.ts
getTotalStats(): Observable<any> {
  return this.http.get<any>('http://localhost:3000/api/stats');
}




 // post.service.ts
 submitComment(comment: any): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`, // Include token in Authorization header
    'Content-Type': 'application/json'
  });

  return this.http.post(`${this.apiUrl}/add`, comment, { headers });
}
deletePost(postId: number): Observable<void> {
  return this.http.delete<void>(`http://localhost:3000/api/posts/${postId}`);
}


}
