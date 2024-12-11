import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { random } from 'lodash';
import { MatSelectModule } from "@angular/material/select";
import { PresupuestoService } from '../../core/services/presupuestos.service';
import { MessageSwal } from '../../utils/message';
import { Router } from '@angular/router';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { ICategoria, IPresupuesto, ISubcategoria } from '../../core/interfaces/presupuesto.interface';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-form-solicitar-presupuesto',
  imports: [MatProgressSpinnerModule, MatInputModule, MatFormFieldModule, MatSelectModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-solicitar-presupuesto.component.html',
  styleUrl: './form-solicitar-presupuesto.component.scss'
})
export class FormSolicitarPresupuestoComponent implements OnInit {
  formPresupuesto: FormGroup = new FormGroup({}); 
  imagenCard = 'assets/images/others/presupuesto' + random(1, 3) + '.png';

  categories = signal<ICategoria[]>([]);
  presupuesto = signal<IPresupuesto[]>([]);
  subcategorias = signal<ISubcategoria[]>([]);
  add = signal<boolean>(true);
  subcat = signal<boolean>(true);
  loading = signal<boolean>(false);


  private formBuilder = inject(FormBuilder);
  private presupuestoService = inject(PresupuestoService);
  private messageSwal = inject(MessageSwal);
  private router = inject(Router);

  ngOnInit(): void {
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
        this.categories.set(res);
      },
    });
  }

  savePresupuesto() {
    let body = {
      ...this.formPresupuesto.value,
      presupuesto: this.presupuesto(),
    };

    this.loading.set(true);
    this.presupuestoService.savePresupuestos(body).subscribe({
      next: (res: any) => {
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
        this.messageSwal.showError(
          'Registro de presupuesto',
          'Ha ocurrido un error al enviar presupuestos'
        );
      },
    });
  }

  selectCategoria(event: any) {
    this.add.set(this.formPresupuesto.value.categoria.categoria === 'Pegatinas' || this.formPresupuesto.value.categoria.categoria === 'Vinilos' ? false : true);
    this.formPresupuesto.get('subcategoria')?.patchValue(null);
    if (!event) {
      this.subcategorias.set([]); 
    } else {
      const body = {
        id_categoria: event.value.id_categoria
      }
      this.presupuestoService.getSubcategorias(body).subscribe({
        next: (res: any) => {
          this.subcategorias.set(res);
          this.subcat.set(this.subcategorias().length > 0 ? true : false);
        },
      });
    }
  }

  selectSubcategoria() {
    this.add.set(this.formPresupuesto.value.subcategoria ? false : true);
  }

  agregarItem() {
    const body:any = {
      categoria: this.formPresupuesto.get('categoria')?.value,
      subcategoria: this.formPresupuesto.get('subcategoria')?.value,
      cantidad: this.formPresupuesto.get('cantidad')?.value,
    };
    this.presupuesto.set([...this.presupuesto(), body]);
    this.formPresupuesto.get('subcategoria')?.patchValue(null);
    this.formPresupuesto.get('categoria')?.patchValue(null);
    this.formPresupuesto.get('cantidad')?.patchValue(1);
    this.add.set(true);
  }

  deleteItem(i:any) {
    let index = this.presupuesto().findIndex(
      (c: any) => c.categoria.id_categoria == i.categoria.id_categoria
    );
    if (index != -1) {
      this.presupuesto().splice(index, 1);
    }
  }

  cantidad(){
    this.add.set(this.formPresupuesto.value.cantidad ? false : true);
  }
}
