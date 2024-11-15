import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  standalone: true
})
export class EmailValidatorDirective {
  @Input() email: string | boolean = true;

  static createValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      const validEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (email && !validEmailPattern.test(email)) {
        return { 'invalidEmail': true };
      }
      return null;
    };
  }
}
