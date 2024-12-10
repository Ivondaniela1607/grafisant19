import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ICliente } from '../../../../core/interfaces/presupuesto.interface';

@Component({
  selector: 'app-slider-clientes',
  imports: [CarouselModule, CommonModule],
  templateUrl: './slider-clientes.component.html',
  styleUrl: './slider-clientes.component.scss'
})
export class SliderClientesComponent {


  @Input() clientes: ICliente[] = [];
  @Input() urlClientes = '';

  customOptions: OwlOptions = {
    items: 3,
    loop: true,
    autoplay: true,
    autoplayTimeout:20000,
    slideTransition: 'linear',

    fluidSpeed: true,
    autoWidth: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    dotsData: true,
    // margin: 2,
    center: true,

    // slideBy: 2,
    navSpeed: 700,
    URLhashListener: true,
    freeDrag: true,
    stagePadding: 30,
    // startPosition: 'URLHash',
    startPosition: 'URLHash',

    navText: [
      `<span class="material-icons">arrow_back_ios</span>`,
      `<span class="material-icons">arrow_forward_ios</span>`
    ],
    // navText: ['Anterior', 'Siguiente'],
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
      1200: {
        items: 6,
      },
    },
  }
  constructor() { }

  ngOnInit(): void {
  }
}
