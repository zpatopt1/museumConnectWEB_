import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }


  register(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Registration successful, do something with userCredential
        console.log('Registration Successful:', userCredential);
      })
      .catch((error) => {
        // Registration failed, handle error
        console.error('Registration Error:', error);
      });
  }

  login(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Login successful, do something with userCredential
        console.log('Login Successful:', userCredential);
      })
      .catch((error) => {
        // Login failed, handle error
        console.error('Login Error:', error);
      });
  }

  logout() {
    this.auth.signOut()
      .then(() => {
        // Logout successful
        console.log('Logged out');
      })
      .catch((error) => {
        // Logout failed, handle error
        console.error('Logout Error:', error);
      });
  }
}
