import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { UsersService } from '../../core/services/users.service';
import { MessageSwal } from '../../utils/message';
import { FilesUtils } from '../../utils/files';


@Component({
  selector: 'app-form-perfil',
  imports: [MatInputModule, MatFormFieldModule, MatSelectModule, ImageCropperComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-perfil.component.html',
  styleUrl: './form-perfil.component.scss'
})
export class FormPerfilComponent implements OnInit {
  imageChangedEvent: any = ''; // Evento del archivo cargado
  croppedImage: any; // Imagen recortada

  typesDocument: any = [];
  data: any = [];
  resultImage: any;
  selectedFile: any;
  dataBefore: any;



  config = {
    zoomable: true,
    viewMode: 1,
    aspectRatio: 4 / 4,
    // autoCropArea: 1,
    movable: true,
    rotatable: true,
    scalable: true,
    zoomOnWheel: true,
    zoomOnTouch: true,
    zoomOnDrag: true,
    cropBoxMovable: true,
    cropBoxResizable: true,
  };

  iscropped = signal<boolean>(false);

  formPerfil: UntypedFormGroup = new UntypedFormGroup({});
  private _formBuilder = inject(UntypedFormBuilder);
  private usersService = inject(UsersService);
  private messageSwal = inject(MessageSwal);
  private filesUtils = inject(FilesUtils);
  private sanitizer = inject(DomSanitizer);


  constructor(
  ) {
    this.formControl();
  }

  ngOnInit(): void {
    this.findData();
    this.getTypesDocument()
    // this.angularCropper.imageUrl = 'assets/images/others/hombre.png';
  }

  formControl() {
    this.formPerfil = this._formBuilder.group({
      id_tipo_documento: [null, [Validators.required]],
      documento: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      usuario: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [""],

    });
  }

  getTypesDocument() {
    this.usersService.getTypesDocument({}).subscribe({
      next: (res: any) => {
        this.typesDocument = res;
      },
    });
  }



  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
      this.selectedFile = <File>event.target.files[0];
      this.iscropped.set(false)
  }

  imageCropped(event: ImageCroppedEvent) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.croppedImage = reader.result as string;
    };
  
    if (event.blob) {
      reader.readAsDataURL(event.blob);
    } else {
      console.error('No blob found in the event.');
    }
  }
  

  cancelar(){
    this.croppedImage = false;
    this.imageChangedEvent= false;
  }

  recortar(){
    this.imageChangedEvent = false;
  }

  findData() {
    /* this.app.openLoader(); */
    this.usersService.getUsers({}).subscribe({
      next: async (res: any) => {
        /* this.app.closeLoader(); */
        if (res.length == 0) {
          this.messageSwal.showError(
            'Consulta Datos',
            'No hay ningun usuario con este id'
          );
          return;
        }
        this.data = res[0];

        
        this.dataBefore = { ...this.data };
        let keys = Object.keys(this.data);
        keys.forEach((key) => {
          if (this.formPerfil.get(key)) {
            this.formPerfil.get(key)?.patchValue(this.data[key]);
          }
        });
        let result = await this.filesUtils.findFile('users', this.data['img']);
        this.croppedImage = `data:image/png;base64,${result}`;
        this.iscropped.set(this.croppedImage ? true : false);
        this.resultImage = `data:image/png;base64,${result}`;
      },
    });
  }


  async update() {    
    if (this.formPerfil.invalid) return;
    let body = {
      ...this.formPerfil.value,
      data_before: this.dataBefore,
    };
    
    let formData = new FormData();
    formData.append('data', JSON.stringify(body));
    
    if (this.selectedFile) {

      formData.append(
        'files',
        await this.filesUtils.urltoFile(
          this.croppedImage,
          this.selectedFile.name,
          this.selectedFile.type
        )
      );
    }

    this.usersService.updateUser(formData).subscribe({
      next: (res: any) => {

        if (!res['ok'] && res['code']) {
          this.messageSwal.showInfo(
            'Actualización de trabajador',
            `Existe un trabajador con el documento ${body.documento}`
          );
          return;
        }
        if (!res['ok']) {
          this.messageSwal.showError(
            'Actualización de trabajador',
            'Ha ocurrido un error al actualizar el trabajador.'
          );
          return;
        }
        this.messageSwal.showSuccess(
          'Actualización de trabajador',
          `Datos actualizados con éxito`
        );
        /*         this.router.navigate(['/laboral/trabajadores/listado-trabajadores']); */
      },
      error: () => {
        this.messageSwal.showError(
          'Actualización de trabajador',
          'Ha ocurrido un error al actualizar el trabajador.'
        );
      },
    });
    /* this.app.openLoader(); */
 
  }
}
