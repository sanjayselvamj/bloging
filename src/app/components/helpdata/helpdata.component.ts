import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-helpdata',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './helpdata.component.html',
  styleUrls: ['./helpdata.component.css'],
})
export class HelpdataComponent implements OnInit {
  showLoginHelp: boolean = false;
  showRegistrationHelp: boolean = false;
  showPostHelp: boolean = false;
  showContactHelp: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      const view = params['view'];

      // Set the flags based on the 'view' parameter value
      this.showLoginHelp = view === 'login';
      this.showRegistrationHelp = view === 'registration';
      this.showPostHelp = view === 'post';
      this.showContactHelp = view === 'contact';

      // Debugging output to verify the flags
      console.log('showLoginHelp:', this.showLoginHelp);
      console.log('showRegistrationHelp:', this.showRegistrationHelp);
      console.log('showPostHelp:', this.showPostHelp);
      console.log('showContactHelp:', this.showContactHelp);
    });
  }
}
