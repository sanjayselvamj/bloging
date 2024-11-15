

export interface Post {
  id: number;
  title: string;
  text_content: string;
  image_url?: string; // Optional field for the post's image
  video_url?: string; // Optional field for the post's video
  likes?: number; // Optional field for likes count
  userHasLiked?: boolean; // Indicates if the user has liked the post
  showComments?: boolean; // Toggles the visibility of comments
  comments?: Comment[]; // List of comments
  newComment?: string; // For holding new comment input
  hovering?: boolean; // Tracks hover state for the like button

}
// src/app/models/post.model.ts
export interface Post {
  id: number;
  title: string;
  content: string;
  user_id: number; // Add this if it doesn't exist
  image_url?: string; // Optional
  video_url?: string; // Optional
  likes?: number; // Optional
// Optional
  username?: string; // Optional
  comments?: Comment[]; // List of comments
  newComment?: string; // For holding new comment input
}


// Assuming Post model looks like this
export interface Post {
  id: number;
  title: string;
  content: string;
  user_id: number; // Add this line if it doesn't exist
  // Add other properties as needed
  likes?: number;
  userHasLiked?: boolean;
  created_at :string;
  username?: string; // //
}

// src/app/models/comment.model.ts
export interface Comment {
  id?: number; // or any other name if you want to rename it
  post_id: number;
  content: string;
  username: string;
  user_id: number; // Ensure to include this if you're using it
  // Add comment_id if necessary
  comment_id?: number; // Add this line if you need comment_id
}


export interface Post {
  id: number;
  title: string;
  content: string;
  owner: string; // Username of the post owner
  // Other properties...
}




export interface Comment {
 // Ensure to match your API response
  post_id: number;
  content: string;
  username: string; // Add this property to store the username
  // Add any other necessary fields
}
