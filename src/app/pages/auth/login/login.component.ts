import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { random } from 'lodash';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({}); 
/*   ls: SecureLS = new SecureLS(); */
  imagenCard = 'assets/images/svg/auth_side' + random(1, 3) + '.svg';

  private authService = inject(AuthService);
  private router = inject(Router)

  onLoggedin() {

  }
}
