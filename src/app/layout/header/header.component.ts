import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  usuario:any;

  /* servicios */
  router = inject(Router);
  menuAll = [
    { label: 'Inicio', routerLink: 'home' },
    { label: 'Quienes Somos', href: 'quienes-somos' },
    { label: 'Servicios', href: 'servicios' },
    { label: 'Contacto', href: 'contacto' },
    // { label: 'Pedidos', routerLink: 'pedidos' },
    { label: 'Iniciar Sesión', routerLink: 'auth/login' },
  ];
  menu = [...this.menuAll];

  navigate(id: any) {
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      } else {
        console.warn(`Element with id "${id}" not found.`);
      }
    }
  }
  

  solicitarPresupuesto() {
    this.router.navigate(['/home/solicitar-presupuesto']);
  }

  perfil() {
    this.router.navigate(['/home/perfil']);
  }

  onLogout(e: Event) {
    e.preventDefault();
    localStorage.removeItem('isLoggedin');
/*     this.ls.remove('modules');
    this.ls.remove('token');
    this.router.navigate(['home']);
    this.authSvr.usuario = null;
    this.usuario = null;
    this.valMenu(); */
  }

  isMenuOpen: boolean = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
