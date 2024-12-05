import { Routes } from '@angular/router';
import { BaseComponent } from './layout/base/base.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailProductoComponent } from './pages/home/detail-producto/detail-producto.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { FormSolicitarPresupuestoComponent } from './forms/form-solicitar-presupuesto/form-solicitar-presupuesto.component';

export const routes: Routes = [
  {
    path: '',
    title: "Grafisant", 
    component: BaseComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'detalle-producto/:id',
        component: DetailProductoComponent
      },
      {
        path: 'solicitar-presupuesto',
        component: FormSolicitarPresupuestoComponent
      },
    
    ]
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
]