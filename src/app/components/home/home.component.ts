import { AdminService } from './../../services/admin.service';
import { Comment } from './../../models/post.model';
import { CommentService } from './../../services/command.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post,  } from '../../models/post.model';
import { HttpClient } from '@angular/common/http';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ShareBottomSheetComponent } from '../share-bottom-sheet/share-bottom-sheet.component';
import{MatBottomSheet}from '@angular/material/bottom-sheet';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule,MatBottomSheetModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/api/posts';
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  isDropdownOpen: boolean = false;
  dropdownOpenPostId: number | null = null; // Track which post's dropdown is open
  currentUserId: number | undefined = undefined;
  usernames: { [userId: string]: string } = {};
  users: any[] = [];
  userStats: any[] = [];
  comments: any[] = [];     // Array to hold comments
  totalStats: any = { totalPosts: 0, totalComments: 0 };

 // Define currentUserId
  constructor(private postService: PostService, private router: Router,private http: HttpClient,private bottomSheet: MatBottomSheet,private authService: AuthService,private AdminService:AdminService) {}

  ngOnInit(): void {
    this.loadPosts();
    this.fetchPosts();
    this.getTotalStats();



  }
  fetchPosts(): void {
    // Fetch posts from the service (add actual service call)
    this.postService.getPosts().subscribe((posts: Post[]) => {
      // Sort posts by creation date, assuming there is a 'created_at' field
      this.posts = posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      this.filteredPosts = [...this.posts]; // Initialize filteredPosts
    });
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(
      (data: Post[]) => {
        // Initialize post properties to avoid undefined errors
        this.posts = data.map(post => ({
          ...post,
          comments: post.comments || [],
          showComments: false,
          username: post.username || 'Unknown',
          newComment: '',
          userHasLiked: post.userHasLiked || false // Ensure userHasLiked is initialized
        }));
      },
      error => {
        console.error('Error loading posts:', error);
      }
    );
  }


  searchPosts(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredPosts = this.posts.filter(post =>
      post.title?.toLowerCase().includes(searchTerm) ||
      post.text_content?.toLowerCase().includes(searchTerm)
    );
  }

  toggleLike(post: Post) {
    post.userHasLiked = !post.userHasLiked;
    post.likes = post.userHasLiked ? (post.likes || 0) + 1 : (post.likes || 0) - 1;
  }

  toggleDropdown(postId: number, event: MouseEvent): void {
    event.stopPropagation(); // Prevent click from closing dropdown
    this.dropdownOpenPostId = this.dropdownOpenPostId === postId ? null : postId; // Toggle dropdown state
  }

  closeDropdown() {
    this.dropdownOpenPostId = null; // Close the dropdown
  }


  viewPost(postId: number): void {
    this.router.navigate(['/post', postId]);
  }

    isTextExpanded = false;

    expandText(): void {
      this.isTextExpanded = !this.isTextExpanded;
    }
    deletePost(postId: number): void {
      const confirmDelete = confirm('Are you sure you want to delete this post?');
      if (!confirmDelete) {
          return; // Exit if the user cancels
      }

      this.postService.deletePost(postId).subscribe({
          next: () => {
              // Filter out the deleted post from the local list to update the view
              this.posts = this.posts.filter(post => post.id !== postId);
              console.log(`Post with ID ${postId} deleted successfully`);
          },
          error: (error) => {
              console.error('Error deleting post:', error);
          }
      });
  }

    sharePost(postId: number) {
      const postUrl = `http://localhost:4200/posts/${postId}`; // Construct the URL based on your routing setup

      // Here, you can create a sharing dialog using different social media links.
      const shareText = 'Check out this post!';

      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
      const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(shareText)}`;
      const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;

      // Open the sharing links in new tabs
      window.open(facebookUrl, '_blank');
      window.open(twitterUrl, '_blank');
      window.open(linkedinUrl, '_blank');
    }

    refreshPosts() {
      this.http.get<Post[]>(this.apiUrl).subscribe({
        next: (posts) => {
          this.posts = posts; // Update posts to display the remaining posts
        },

        error: (error) => {
          console.error('Error fetching posts:', error);
          alert('Failed to load posts.'); // Notify user of the error
        }
      });
    }

    toggleShareMenu(postId: string): void {
      this.bottomSheet.open(ShareBottomSheetComponent, {
        data: postId
      });
    }


    getPostUrl(postId: number): string {
      return `http://localhost:4200/posts/${postId}`; // Construct the URL based on your routing setup
    }
    getUsername(post: Post): string {
      // Display the username based on the user ID
      return post.user_id === this.currentUserId ? 'You' : post.username || 'Unknown';
    }


    getTotalStats(): void {
      this.AdminService.getStats().subscribe(
        (data) => {
          console.log('Fetched Total Stats:', data); // Check the structure of data
          this.totalStats = {
            totalPosts: data.totalPosts || 0,
            totalComments: data.totalComments || 0,
            totalUsers: data.totalUsers || 0
          };
        },
        (error) => {
          console.error('Error fetching total stats:', error);
          this.totalStats = { totalPosts: 0, totalComments: 0, totalUsers: 0 }; // Fallback values
        }
      );
    }

  }

