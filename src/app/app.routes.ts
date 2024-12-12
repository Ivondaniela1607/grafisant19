import { Routes } from '@angular/router';
import { BaseComponent } from './layout/base/base.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailProductoComponent } from './pages/home/detail-producto/detail-producto.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { FormSolicitarPresupuestoComponent } from './forms/form-solicitar-presupuesto/form-solicitar-presupuesto.component';
import { OrdersComponent } from './pages/orders/orders.component';

import { LoggedInGuard } from './core/guard/logged-in.guard';
import { RegisterComponent } from './pages/auth/register/register.component';
import { FormPerfilComponent } from './forms/form-perfil/form-perfil.component';

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
        canActivate: [LoggedInGuard],
        path: 'solicitar-presupuesto',
        component: FormSolicitarPresupuestoComponent
      },
      {
        canActivate: [LoggedInGuard],
        path: 'pedidos',
        component: OrdersComponent
      },
      {
        canActivate: [LoggedInGuard],
        path: 'perfil',
        component: FormPerfilComponent
      },
    
    ]
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/register',
    component: RegisterComponent
  },
]