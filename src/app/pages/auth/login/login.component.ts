import { HttpErrorResponse } from "@angular/common/http";
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Validators, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { random } from 'lodash';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCheckboxModule } from "@angular/material/checkbox";

@Component({
  selector: 'app-login',
  imports: [RouterLink, MatCheckboxModule, MatInput, MatFormField, MatLabel, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  ip = "";
  signInForm: UntypedFormGroup = new UntypedFormGroup({});

  loginForm: FormGroup = new FormGroup({}); 
/*   ls: SecureLS = new SecureLS(); */
  imagenCard = 'assets/images/svg/auth_side' + random(1, 3) + '.svg';

  private _authService = inject(AuthService);
  private router = inject(Router)
  private _formBuilder = inject(UntypedFormBuilder)
  private _activatedRoute = inject(ActivatedRoute)
  private _router = inject(Router)


  ngOnInit(): void {
    this.signInForm = this._formBuilder.nonNullable.group({
      usuario: ["", [Validators.required]],
      password: ["", Validators.required],
      rememberMe: [""],

    });
  }
  
  onLoggedin() {

    const body = {
      ...this.signInForm.value,
    };

    body.usuario = body.usuario.trim();
    this._authService.login(body).subscribe({
      next: (res: any) => {

        //this.app.closeLoader()

        //  console.log('\x1b[34m%s\x1b[0m', 'res Login', JSON.stringify(res.user.extension));
        if (this.signInForm.get("remember")?.value) {
          localStorage.setItem("usuario", this.signInForm.get("usuario")?.value);
          localStorage.setItem("remember", "true");
        } else {
          localStorage.removeItem("usuario");
          localStorage.removeItem("remember");
        }
        if (this._authService.usuario.id_role === 5) {
          this.router.navigate(["/comparativas"]);
        } else {
          this.router.navigate(["/"]);
        }
        localStorage.setItem("img", res.user?.img);
        // const user= this.loginForm.get('usuario')?.value
        const password = this.signInForm.get("password")?.value;

        localStorage.setItem("tok", password);

        // const extension= res.user?.extension
        //console.log('\x1b[34m%s\x1b[0m', 'user', res.user);

        // console.log('\x1b[31m%s\x1b[0m', `https://fastco.dialcata.com/clienteweb/login.php?login=login&selectType=webPhone&userName=${user}&password=${password}&WPextension=${extension}`);
        //window.open(`https://fastco.dialcata.com/clienteweb/login.php?login=login&selectType=webPhone&userName=${user}&password=${password}&WPextension=${extension}`, '_blank')
      },
      error: () => {
        // this.app.closeLoader()
      },
    });
  }
}
