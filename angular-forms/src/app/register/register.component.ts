import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { User } from './user';

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
      firstName: [''],
      lastName: '',
      email: '',
      sendCatalog: false
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
}
