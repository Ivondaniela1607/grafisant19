import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UsersService } from '../../../core/services/users.service';
import { FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MessageSwal } from '../../../utils/message';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})


export class RegisterComponent implements OnInit {

  form: UntypedFormGroup = new UntypedFormGroup({});
  typesDocument:any = [];

  private usersService = inject(UsersService);
  private _formBuilder = inject(UntypedFormBuilder);
  private messageSwal = inject(MessageSwal);
  private router = inject(Router);

  ngOnInit(): void {
    this.getTypesDocument();
    this.form = this._formBuilder.group({
      id_tipo_documento: [null, [Validators.required]],
      documento: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      usuario: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false],

    });
  }

  getTypesDocument() {
    this.usersService.getTypesDocument({}).subscribe({
      next: (res: any) => {
        this.typesDocument = res;
      },
    });
  }

  onRegister() {
    if (this.form.invalid) return;
    this.usersService.saveUser(this.form.value).subscribe({
      next: (res: any) => {
        if (!res['ok'] && res['email']) {
          return this.messageSwal.showWarning(
            'Validación email',
            'Ya hay una cuenta registrada con este email'
          );
        }
        if (!res['ok'] && res['document']) {
          return this.messageSwal.showWarning(
            'Validación documento',
            'Ya hay una cuenta registrada con este documento'
          );
        }
        this.messageSwal.showSuccess(
          'Registro de usuario',
          `El usuario ${res['user']} se ha registrado con éxito`
        );

        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.messageSwal.showError(
          'Registro de usuario',
          'Ha ocurrido un error al registrar el usuario'
        );
      },
    });
    localStorage.setItem('isLoggedin', 'true');
    if (localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/']);
    }
  }
}
