import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmailValidatorDirective } from '../../directives/email-validator.directive';  // Import the directive
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    EmailValidatorDirective , // Include the directive in imports
  ]
})
export class ContactComponent {
  contactForm: FormGroup;
  formMessage: string = '';

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, EmailValidatorDirective.createValidator()]],  // Use the validator factory
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
        console.error('Form is invalid', this.contactForm.errors);
        return;
    }

    console.log('Form Values:', this.contactForm.value); // Add this line to debug

    const messageData = {
        field: this.contactForm.value.name, // Corrected field mapping
        email: this.contactForm.value.email,
        message: this.contactForm.value.message
    };

    this.contactService.sendMessage(messageData).subscribe(
        (response: any) => {
            this.formMessage = 'Message sent successfully!';
            this.resetForm();
        },
        (error: HttpErrorResponse) => {
            console.error('Error sending message:', error);
            this.handleError(error);
        }
    );
}


  private resetForm() {
    this.contactForm.reset();
    this.contactForm.markAsPristine();
    this.contactForm.markAsUntouched();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      this.formMessage = 'An error occurred: ' + error.error.message;
    } else {
      this.formMessage = `Server returned code ${error.status}, message: ${error.message}`;
    }
  }
}
