import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    LoginComponent
  ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  newPost: { title: string; text_content: string } = { title: '', text_content: '' };
  imageFile: File | null = null;
  videoFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  videoPreview: string | ArrayBuffer | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  currentUser: { id: number; username: string } | null = null;
  currentUserId: number | null = null;

  constructor(private postService: PostService, private authService: AuthService) {}

  ngOnInit() {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    this.currentUserId = this.authService.getUserId();
    if (!this.currentUserId) {
      this.errorMessage = 'User not logged in.';
    }
  }
  onFileChange(event: any, type: 'image' | 'video') {
    const file = event.target.files[0];
    if (type === 'image') {
      this.imageFile = file;
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
      }
    } else if (type === 'video') {
      this.videoFile = file;
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.videoPreview = reader.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onSubmit(form: any) {
    if (form.valid) {
      const formData = new FormData();

      // Check if currentUserId is set
      if (!this.currentUserId) {
        this.errorMessage = 'User not logged in or missing user ID.';
        return;
      }

      formData.append('user_id', this.currentUserId.toString());
      formData.append('title', this.newPost.title);
      formData.append('text_content', this.newPost.text_content);

      if (this.imageFile) formData.append('image', this.imageFile);
      if (this.videoFile) formData.append('video', this.videoFile);

      this.postService.createPost(formData).subscribe(
        (response) => {
          this.successMessage = 'Post created successfully!';
          this.resetForm();
        },
        (error) => {
          this.errorMessage = 'Failed to create post. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please fill out the required fields.';
    }
  }


  resetForm() {
    this.newPost = { title: '', text_content: '' };
    this.imageFile = null;
    this.videoFile = null;
    this.imagePreview = null;
    this.videoPreview = null;
  }
}
