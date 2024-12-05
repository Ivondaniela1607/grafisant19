import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { random } from 'lodash';
import { MatSelectModule } from "@angular/material/select";
import { PresupuestoService } from '../../core/services/presupuestos.service';
import { MessageSwal } from '../../utils/message';
import { Router } from '@angular/router';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-solicitar-presupuesto',
  imports: [MatInputModule, MatFormFieldModule, MatSelectModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-solicitar-presupuesto.component.html',
  styleUrl: './form-solicitar-presupuesto.component.scss'
})
export class FormSolicitarPresupuestoComponent implements OnInit {

  formPresupuesto: FormGroup = new FormGroup({}); 
  categories:any = [];
  subcategorias:any = [];
  imagenCard = 'assets/images/others/presupuesto' + random(1, 3) + '.png';

  agregar: boolean = false;
  subcat: boolean = true;
  add: boolean = true;
  presupuesto:any = [];

  private formBuilder = inject(FormBuilder);
  private presupuestoService = inject(PresupuestoService);
  private messageSwal = inject(MessageSwal);
  private router = inject(Router);

  ngOnInit(): void {
    console.log('imagenCard', this.imagenCard);
    
    this.formControl();
    this.getCategorias();
    /*   this.getPresupuestos(); */
  }

  formControl() {
    this.formPresupuesto = this.formBuilder.group({
      cantidad: [1],
      descripcion: ['', [Validators.required]],
      categoria: [null],
      subcategoria: [null],
      politicas: [false],
    });
  }

  getPresupuestos() {
    this.presupuestoService.getPresupuestos({}).subscribe((res: any) => {});
  }

  getCategorias() {
    this.presupuestoService.getCategorias({}).subscribe({
      next: (res: any) => {
        this.categories = res;
        console.log('this.categorues', this.categories);
        
      },
    });
  }

  savePresupuesto() {
    let body = {
      ...this.formPresupuesto.value,
      presupuesto: this.presupuesto,
    };
/*    this.app.openLoader(); */
    this.presupuestoService.savePresupuestos(body).subscribe({
      next: (res: any) => {
/*         this.app.closeLoader(); */
        if (!res['ok']) {
          this.messageSwal.showError(
            'Registro de presupuesto',
            'Ha ocurrido un error al solicitar presupuesto .'
          );
          return;
        }
        this.messageSwal.showSuccess(
          'Registro de presupuesto',
          `Presupuesto enviado con éxito`
        );
        this.formPresupuesto.get('id_presupuestos')?.patchValue(res['id']);
        this.router.navigate(['/pedidos']);
      },
      error: () => {
      /*   this.app.closeLoader(); */
        this.messageSwal.showError(
          'Registro de presupuesto',
          'Ha ocurrido un error al enviar presupuestos'
        );
      },
    });
  }

  selectCategoria(event: any) {
    console.log('event', event);
    console.log('this.formPresupuesto', this.formPresupuesto);
    console.log('this.formPresupuesto.value.categoria', this.formPresupuesto.value.categoria);
    console.log('this.formPresupuesto.value.categoria.categoria', this.formPresupuesto.value.categoria.categoria);
    console.log('this.formPresupuesto.get', this.formPresupuesto.get('categoria'));
    
    if(this.formPresupuesto.value.categoria.categoria === 'Pegatinas' || this.formPresupuesto.value.categoria.categoria === 'Vinilos'){
      this.add = false;
    }else {
      this.add = true;
    }
    console.log('this.add', this.add);
    
    this.formPresupuesto.get('subcategoria')?.patchValue(null);
    if (!event) {
      this.subcategorias = [];
    } else {
      const body = {
        id_categoria: event.value.id_categoria
      }
      this.presupuestoService.getSubcategorias(body).subscribe({
        next: (res: any) => {
          this.subcategorias = res;
          console.log('this.subcategorias', this.subcategorias);
          
          if (this.subcategorias.length === 0) {
            this.subcat = false;
          } else {
            this.subcat = true;
          }
        },
      });
    }
  }

  selectSubcategoria(event: any) {
    this.agregar = true;
    console.log(this.formPresupuesto.value.subcategoria);
    
    if(this.formPresupuesto.value.subcategoria){
      this.add = false;
    }else {
      this.add = true;
    }
    console.log(this.add);
  }

  agregarItem() {
    console.log('this.formPresupuesto', this.formPresupuesto);
    console.log('this.formPresupuesto.get', this.formPresupuesto.get('categoria'));
    
    const body:any = {
      categoria: this.formPresupuesto.get('categoria')?.value,
      subcategoria: this.formPresupuesto.get('subcategoria')?.value,
      cantidad: this.formPresupuesto.get('cantidad')?.value,
    };
    this.presupuesto.push(body);
    this.formPresupuesto.get('subcategoria')?.patchValue(null);
    this.formPresupuesto.get('categoria')?.patchValue(null);
    this.formPresupuesto.get('cantidad')?.patchValue(1);
    this.add = true;
    console.log('this.presupuesto', this.presupuesto);
    console.log('this.formPresupuesto', this.formPresupuesto);
    
  }

  deleteItem(i:any) {
    let index = this.presupuesto.findIndex(
      (c: any) => c.categoria.id_categoria == i.categoria.id_categoria
    );
    if (index != -1) {
      this.presupuesto.splice(index, 1);
    }
  }

  cantidad(){
    if(this.formPresupuesto.value.cantidad){
      this.add = false;
    }else {
      this.add = true;
    }
  }

}
