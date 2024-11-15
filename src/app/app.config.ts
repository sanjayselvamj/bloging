  import { Routes } from '@angular/router';
  import { HomeComponent } from './components/home/home.component';
  import { LoginComponent } from './components/login/login.component';
  import { NewACComponent } from './components/new-ac/new-ac.component';
  import { AboutComponent } from './components/about/about.component';
  import { ContactComponent } from './components/contact/contact.component';
  import { PostComponent } from './components/post/post.component'; // Import PostComponent
  import { AuthGuard } from './guards/auth.guard';
  import { HelpdataComponent } from './components/helpdata/helpdata.component';
  import { PostDetailComponent } from './components/post-detail/post-detail.component';

import { AdminGuard } from './guards/admin.guard';


  export const appConfig: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'new-ac', component: NewACComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'post', component: PostComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'helpdata', component: HelpdataComponent },
    { path: 'post/:id', component: PostDetailComponent }, // Ensure this route is correctly placed
    { path: '**', redirectTo: 'login' },

      // Ensure AdminGuard is imported and used here

  ];

