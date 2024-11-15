import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterModule, CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'myapp';
  isLoginOrRegisterOrHelpPage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Detect route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route contains 'login', 'help', or 'register'
        const currentRoute = this.router.url;
        if (
          currentRoute.includes('/login') ||
          currentRoute.includes('/help') ||
          currentRoute.includes('/new-ac')
        ) {
          this.isLoginOrRegisterOrHelpPage = true;
        } else {
          this.isLoginOrRegisterOrHelpPage = false;
        }
      }
    });
  }
}
