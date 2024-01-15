import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  user: User;

  constructor(private service: AuthService, 
    private eventService: EventService, 
    private formBuilder: FormBuilder, 
    private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)]]
    });
    this.user = {
      email: '',
      password: ''
    }

  }


  //verify if input was touched
  isFieldTouched(fieldName: string) {
    let isTouched: boolean = true
    const control = this.loginForm.get(fieldName);
    if (control != null)
      isTouched = control.touched;
    return isTouched;
  }

  //verify if input value is valid 
  isFieldInvalid(fieldName: string) {
    let isInvalid: boolean = true;
    const control = this.loginForm.get(fieldName);
    if (control != null)
      isInvalid = control.invalid && (control.touched 
    || control.dirty);
    return isInvalid;
  }

  onFormSubmit() {

    if (this.loginForm.valid) {

      this.user = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      }

      try {
        //call service
        this.service.login(this.user.email, this.user.password);
        localStorage.setItem('userEmail', this.user.email);
        //raise event
        this.eventService.myEvent.emit(true);

        this.router.navigate(['/dashboard']);
      } catch (error) {
        console.error(error);
      }

    } else {
      // Handle invalid form
      this.loginForm.markAllAsTouched();
      console.error('Form is invalid');
    }
  }

  clearForm() {
    this.loginForm.reset();
  }
}
