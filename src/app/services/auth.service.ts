
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject} from 'rxjs';
import { Router } from '@angular/router';

interface LoginResponse {
  success: boolean;
  token?: string;
  username?: string;
  userId?: number; // Ensure this is a number
}

interface RegisterResponse {
  success: boolean;
  message?: string;
}
interface LoginResponse {
  success: boolean;
  token?: string;
  username?: string;
  role?: string;

}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private username: string | null = null;
  private userId: number | null = null;
  private userIdSubject = new BehaviorSubject<number | null>(null);
  private currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  private defaultAdminUsername = 'admin';
  private defaultAdminPassword = 'admin123';



  constructor(private http: HttpClient) {
    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? parseInt(storedUserId, 10) : null;
    this.username = localStorage.getItem('username');
  }


  login(username: string, password: string): Observable<LoginResponse> {
    // Simulating admin login with hardcoded credentials
    if (username === this.defaultAdminUsername && password === this.defaultAdminPassword) {
      const adminResponse = { success: true, username: this.defaultAdminUsername, role: 'admin' };
      localStorage.setItem('currentUser', JSON.stringify(adminResponse)); // Store admin in localStorage
      return new Observable((observer) => {
        observer.next(adminResponse);
        observer.complete();
      });
    } else {
      // API-based login for non-admin users
      return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
        tap((response) => {
          if (response.success && response.token) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('currentUser', JSON.stringify({ username, role: response.role }));
          }
        }),
        catchError(this.handleError)
      );
    }
  }

  setUserId(userId: number) {
    this.userId = userId;
    localStorage.setItem('userId', userId.toString()); // Ensure it's stored in localStorage
  }


  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId) : null;
  }



  getUsername(): string | null {
        if (!this.username) {
          this.username = localStorage.getItem('username');
        }
        return this.username; // Return the username (or null if not found)
      }
      setToken(token: string) {
        localStorage.setItem('authToken', token); // Example token storage
      }

      getToken(): string | null {
        return localStorage.getItem('authToken');
      }

      getCurrentUser() {
        return { id: this.userId ?? 0, username: this.username ?? '' };
      }
  isLoggedIn(): boolean {
    return this.getUserId() !== null;
  }

  addUser(username: string, password: string): Observable<RegisterResponse> {
        const userData = { username, password };
        return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, userData).pipe(
          tap((response) => {
            console.log('User registered successfully:', response);
          }),
          catchError(this.handleError)
        );
      }

      logout(): void {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        this.username = null;
        this.userId = null;
      }
  isAuthenticated(): boolean {
        return !!localStorage.getItem('authToken'); // Check if authToken exists in localStorage
      }

      storeUserData(token: string, userId: number) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', userId.toString());
      }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error.message || error.message);
    return throwError(() => new Error(error.error.message || 'Something went wrong; please try again later.'));
  }
  isAdmin(): boolean {
    return this.currentUser.role === 'admin';  // Check if the user has the role of admin
  }
}


