import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o'

@Component({
  selector: 'app-slider-ultimos-proyectos',
  imports: [CarouselModule, CommonModule],
  templateUrl: './slider-ultimos-proyectos.component.html',
  styleUrl: './slider-ultimos-proyectos.component.scss'
})
export class SliderUltimosProyectosComponent {

  @Input() data:any = [];
  @Input() url = '';

  customOptions: OwlOptions = {
    autoWidth: false,
    loop: false,
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
    startPosition: 'URLHash',
    navText: [
      `<em class='mdi mdi-chevron-left'></em>`,
      `<em class="mdi mdi-chevron-right"></em>`,
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
        items: 3,
      },
    },
  }
}
