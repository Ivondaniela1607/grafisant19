import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-header',
  imports: [OverlayModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @ViewChild('trigger', { static: false }) trigger!: ElementRef;
  usuario:any;
  isPopoverOpenChatsArchivados = signal<boolean>(false);
  /* servicios */
  private router = inject(Router);
  private authSvr = inject(AuthService);
  menuAll = [
    { label: 'Inicio', routerLink: 'home' },
    { label: 'Quienes Somos', href: 'quienes-somos' },
    { label: 'Servicios', href: 'servicios' },
    { label: 'Contacto', href: 'contacto' },
    // { label: 'Pedidos', routerLink: 'pedidos' },
    { label: 'Iniciar Sesión', routerLink: 'auth/login' },
  ];
  menu = [...this.menuAll];


  constructor() {
    this.authSvr.validarRenovarToken().subscribe((res) => {
      console.log('resvalidarRenovarToken', res);
      
      this.usuario = this.authSvr.usuario;
      console.log('this.usuario', this.usuario);
      this.valMenu();
    });
    this.valMenu();
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
    this.usuario = this.authSvr.usuario;
    console.log('this.usuario', this.usuario);
    if (this.usuario) {
      this.menu = this.menuAll.filter((c) => c.label != 'Iniciar Sesión');
    } else {
      this.menu = [...this.menuAll];
    }
  }
  

  solicitarPresupuesto() {
    this.router.navigate(['/solicitar-presupuesto']);
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
 */
    this.valMenu();
  }

  isMenuOpen: boolean = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  togglePopoverChatsArchivados() {
    this.isPopoverOpenChatsArchivados.set(!this.isPopoverOpenChatsArchivados());
    if (this.isPopoverOpenChatsArchivados()) {

    }
  }

}
