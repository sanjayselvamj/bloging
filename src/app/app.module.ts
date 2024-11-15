import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { appConfig } from './app.config'; // Import your routes
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { AdminGuard } from './guards/admin.guard';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule, // If using ngModel
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatBottomSheetModule,
    RouterModule.forRoot(appConfig) // Add RouterModule with your routes
  ],
  providers: [AuthGuard], // Ensure AuthGuard is provided
  bootstrap: [] // No need to bootstrap components if they're standalone
})
export class AppModule { }
