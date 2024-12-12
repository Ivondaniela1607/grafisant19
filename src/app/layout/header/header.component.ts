import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { ImgErrorUserDirective } from '../../core/directives/imgErrorUser.directive';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  imports: [ImgErrorUserDirective, OverlayModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @ViewChild('trigger', { static: false }) trigger!: ElementRef;
  usuario:any;
  isPopoverOpen = signal<boolean>(false);
  url = environment.server_url+'/uploads/users/';
  /* servicios */
  private router = inject(Router);
  private authSvr = inject(AuthService);

  menuAll = [
    { label: 'Inicio', routerLink: '/' },
    { label: 'Quienes somos', href: 'quienes-somos' },
    { label: 'Servicios', href: 'servicios' },
    { label: 'Contacto', href: 'contacto' },
     { label: 'Pedidos', routerLink: 'pedidos' },
    { label: 'Iniciar Sesión', routerLink: 'auth/login' },
  ];

  menu = [...this.menuAll];

  constructor() {
    this.authSvr.validarRenovarToken().subscribe((res) => {
      this.usuario = this.authSvr.usuario;
      this.valMenu();
    });

  }

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

  valMenu() {
    if (this.usuario) {
      this.menu = this.menuAll.filter((c) => c.label != 'Iniciar Sesión');
    } else {
      this.menu = this.menuAll.filter((c) => c.label != 'Pedidos');
      this.menu = [...this.menuAll];
    }
  }
  

  solicitarPresupuesto() {
    this.router.navigate(['/solicitar-presupuesto']);
  }

  perfil() {
    this.router.navigate(['/perfil']);
  }

  onLogout(e: Event) {
    e.preventDefault();
    localStorage.removeItem("isLoggedin");
    localStorage.removeItem("token");
    localStorage.removeItem("operators");
    localStorage.removeItem("tok");
    //localStorage.removeItem('isLoggedin')
    this.router.navigate(["/auth/login"]);
    this.valMenu();
  }

  isMenuOpen: boolean = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleOpcUsuario() {
    this.isPopoverOpen.set(!this.isPopoverOpen());
    if (this.isPopoverOpen()) {

    }
  }

}
