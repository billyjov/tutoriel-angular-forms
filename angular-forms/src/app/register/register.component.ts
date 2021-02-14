import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { User } from './user';

function ratingRangeValidator(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {

    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'rangeError': true };
    }

    return null;
  };

}

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {

  const emailControl = c.get('email');
  const emailConfirmControl = c.get('confirmEmail');

  if (emailControl.pristine || emailConfirmControl.pristine) {
    return null;
  }

  if (emailControl.value === emailConfirmControl.value) {
    return null;
  }

  return { 'match': true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public user: User = new User();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(40)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required]
      }, { validators: emailMatcher }),
      phone: '',
      rating: [null, ratingRangeValidator(1, 5)],
      notification: 'email',
      sendCatalog: false
    });

    this.registerForm.get('notification').valueChanges.subscribe(value => {
      this.setNotificationSetting(value);
    });
  }

  public saveData() {
    console.log(this.registerForm);
    console.log('valeurs: ', JSON.stringify(this.registerForm.value));
    console.log('hello');
  }

  public fillFormData(): void {
    this.registerForm.patchValue({
      firstName: 'John',
      lastName: 'Doe B',
      sendCatalog: true
    });
  }

  public setNotificationSetting(method: string): void {
    const phoneControl = this.registerForm.get('phone');

    if (method === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }

    phoneControl.updateValueAndValidity();

  }
}
