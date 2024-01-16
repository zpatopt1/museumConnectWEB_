import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  user: User;

  constructor(private service: AuthService, private eventService: EventService, private formBuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, /*Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)*/]],
      username: ['', [Validators.required, Validators.minLength(2)]],
      confirmPassword: ['', [Validators.required, /*Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)*/]]

      // Add more form controls and their respective validations as needed
    });
    this.user = {
      email: '',
      password: ''
    }

  }


  //verify if input was touched
  isFieldTouched(fieldName: string) {
    let isTouched: boolean = true
    const control = this.registerForm.get(fieldName);
    if (control != null)
      isTouched = control.touched;
    return isTouched;
  }

  //verify if input value is valid 
  isFieldInvalid(fieldName: string) {
    let isInvalid: boolean = true;
    const control = this.registerForm.get(fieldName);
    if (control != null) {
      isInvalid = control.invalid && (control.touched || control.dirty);
      if (fieldName == 'confirmPassword')
          isInvalid = isInvalid && this.registerForm.get('password')?.value == control?.value;
    }
    return isInvalid;
  }


  onFormSubmit() {

    if (this.registerForm.valid) {
      console.log(this.user.email);
      // Perform actions with the form data

      this.user = {
        username: this.registerForm.get('username')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
      }


      try {
        //call service
        this.service.register(this.user.email, this.user.password);
        localStorage.setItem('userEmail', this.user.email);
        //raise event
        this.eventService.myEvent.emit(true);


        this.router.navigate(['/dashboard']);
      } catch (error) {
        console.error(error);
      }

    } else {
      // Handle invalid form
      this.registerForm.markAllAsTouched();
      console.error('Form is invalid');
    }
  }

  clearForm() {
    this.registerForm.reset();
  }
}
