
import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../services/models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { TokenService } from '../../services/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {

  }

  login() {
    this.errorMsg = []; // if click and wrong and reclick errorMsg should be clear
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        // If the authentication request succeeds, store the token
        this.tokenService.token = res.token as string; // Store the token in localStorage
        this.router.navigate(['books']);
      },
      error: (err) => {
        console.log(err); // Log the error for debugging purposes
        // If there are validation errors, display them
        if (err.error.validationErrors) {  // used in UI
          // Handle validation errors
          //  e.g "password must be at least 8 characters"
          this.errorMsg = err.error.validationErrors;
        } else {
          // Handle other errors  
          this.errorMsg.push(err.error.error);
        }
      }
    });
  }

  register() {
    this.router.navigate(['register']);
  }

}
