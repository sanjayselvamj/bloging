import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewACComponent } from './components/new-ac/new-ac.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component'; // Corrected import path
import { PostComponent } from './components/post/post.component';
import { AuthGuard } from './guards/auth.guard';
import { HelpdataComponent } from './components/helpdata/helpdata.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'new-ac', component: NewACComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'post', component: PostComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'helpdata', component: HelpdataComponent },
  { path: 'post/:id', component: PostDetailComponent }, // Corrected parameter name
  { path: '**', redirectTo: 'login' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    MatBottomSheetModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
