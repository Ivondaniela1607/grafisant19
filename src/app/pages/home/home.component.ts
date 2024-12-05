import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { ServiciosService } from '../../core/services/servicios.service';
import { SliderUltimosProyectosComponent } from './components/slider-ultimos-proyectos/slider-ultimos-proyectos.component';


@Component({
  selector: 'app-home',
  imports: [CommonModule, SliderUltimosProyectosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public readonly url = environment.servicios_path+'/ultimos_proyectos/';

  
  servicios:any = [];
  data:any = [];
  clientes:any = [];
  resultImage: any;

  private router = inject(Router);
  private serviciosService = inject(ServiciosService);

  public readonly urlServices = environment.servicios_path;

  constructor(
    private elRef: ElementRef,
  ) {}

  ngOnInit(): void {
    this.getServicios();
    this.getUltimosProyectos();
    this.geClientes();
  }

  getServicios(){
/*     this.app.openLoader(); */
    this.serviciosService.getServicios({}).subscribe({
      next: async (res: any) => {
   /*      this.app.closeLoader(); */
        this.servicios = res;
        if (res.length == 0) {
   /*        this.messageSwal.showError(
            'Consulta Datos',
            'No hay ningun servicio con este id'
          );
          return; */
        }

      },
    });
  }

  getUltimosProyectos(){
/*     this.app.openLoader(); */
    this.serviciosService.getUltimosProyectos({}).subscribe({
      next: async (res: any) => {
 /*        this.app.closeLoader(); */
        this.data = res;
        if (res.length == 0) {
   /*        this.messageSwal.showError(
            'Consulta Datos',
            'No hay ningun proyecto con este id'
          );
          return; */
        }
      },
    });
  }

  geClientes(){
/*     this.app.openLoader(); */
    this.serviciosService.getClientes({}).subscribe({
      next: async (res: any) => {
        console.log('reessss', res);
    /*     this.app.closeLoader(); */
        this.clientes = res;


        if (res.length == 0) {
     /*      this.messageSwal.showError(
            'Consulta Datos',
            'No hay ningun proyecto con este id'
          );
          return; */
        }
      },
    });
  }
  

  verMas(opc: string) {

    this.router.navigate(['detalle-producto/', opc]);
  }

  solicitarPresupuesto() {
    this.router.navigate(['/solicitar-presupuesto']);
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandler() {
    const topDistance = window.pageYOffset;
    const layers = this.elRef.nativeElement.querySelectorAll(
      "[data-type='parallax']"
    );
    layers.forEach((layer:any) => {
      const depth = layer.getAttribute('data-depth');
      const translate3d = 'translate3d(0, ' + -(topDistance * depth) + 'px, 0)';
      layer.style['-webkit-transform'] = translate3d;
      layer.style['-moz-transform'] = translate3d;
      layer.style['-ms-transform'] = translate3d;
      layer.style['-o-transform'] = translate3d;
      layer.style.transform = translate3d;
    });
  }

}