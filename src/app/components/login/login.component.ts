
  import { Component } from '@angular/core';
  import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { CommonModule } from '@angular/common';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatInputModule } from '@angular/material/input';
  import { MatButtonModule } from '@angular/material/button';
  import { MatIconModule } from '@angular/material/icon';
  import { AuthService } from '../../services/auth.service';
  import { Router, RouterModule } from '@angular/router';
  import { LoginResponse } from '../../services/login-response.service';

  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      RouterModule,
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
  })
  export class LoginComponent {
    loginForm: FormGroup;
    errorMessage: string | null = null;

    hidePassword = true;

    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) {
      this.loginForm = this.fb.group({
        username: ['sanjay', Validators.required],
        password: ['sanjay2211', Validators.required],
      });
    }
    ngOnInit(): void {}
    storeUserData(token: string, userId: number) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userId.toString());
    }

    onLogin() {
      if (this.loginForm.valid) {
        const { username, password } = this.loginForm.value;

        this.authService.login(username, password).subscribe({
          next: (response: LoginResponse) => {
            console.log('Backend response:', response);  // Debugging line
            if (response.success) {
              if (response.token) {
                // Store the token and userId in localStorage
                localStorage.setItem('authToken', response.token);
                if (response.userId !== undefined) {
                  localStorage.setItem('userId', response.userId.toString());
                }
                // Navigate to home on successful login
                this.router.navigate(['/home']);
              } else {
                this.errorMessage = 'Login failed: Missing token in server response.';
              }
            } else {
              this.errorMessage = 'Invalid username or password';
            }
          },
          error: () => {
            this.errorMessage = 'Incorrect username or password. Please try again.';
          },
        });
      } else {
        this.errorMessage = 'Please fill in both fields';
      }
    }

    navigateToNewAccount() {
      this.router.navigate(['/new-ac']);
    }

    navigateToHelp() {
      this.router.navigate(['/helpdata']).catch(console.error);
    }
  }
