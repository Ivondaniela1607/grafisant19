import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from '../../../core/services/servicios.service';
import { environment } from '../../../../environments/environment';
import { FilesUtils } from '../../../utils/files';
import { MessageSwal } from '../../../utils/message';
import { CommonModule } from '@angular/common';
import { SliderUltimosProyectosComponent } from '../components/slider-ultimos-proyectos/slider-ultimos-proyectos.component';


@Component({
  selector: 'app-detail-producto',
  imports: [SliderUltimosProyectosComponent, CommonModule],
  templateUrl: './detail-producto.component.html',
  styleUrl: './detail-producto.component.scss'
})
export class DetailProductoComponent {

  public readonly url = environment.servicios_path+'/slider/';
  servicios:any = [];
  data:any = [];
  idServicio: any;
  resultImage: any;
  tags:any = [];

  private activatedRoute = inject(ActivatedRoute);
  private serviciosService = inject(ServiciosService);
  private filesUtils = inject(FilesUtils);
  private messageSwal = inject(MessageSwal);

  async ngOnInit(): Promise<void> {
    this.idServicio = this.activatedRoute.snapshot.params['id'];
    this.getServicioById(this.idServicio);
    this.getServiciosImg(this.idServicio);
  }

  getServicioById(id_servicio:any){
/*     this.app.openLoader(); */
    this.serviciosService.getServiciosById({id_servicio}).subscribe({
      next: async (res: any) => {
/*         this.app.closeLoader(); */
        this.tags = res[0].tags.split(",");
        this.servicios = res;
        if (res.length == 0) {
          this.messageSwal.showError(
            'Consulta Datos',
            'No hay ningún servicio con este id'
          );
          return;
        }
        let result = await this.filesUtils.findFile('servicios', this.servicios[0]['img_principal']);
        this.resultImage = `data:image/png;base64,${result}`;
      },
    });
  }

  getServiciosImg(id_servicios_img:any){
    this.serviciosService.getServiciosImg({id_servicios_img}).subscribe({
      next: (res: any) => {
/*         this.app.closeLoader(); */
        this.data = res;
        console.log('this.data', this.data);
        
        if (res.length == 0) {
          this.messageSwal.showError(
            'Consulta Datos',
            'No hay ningún servicio con este id'
          );
          return;
        }
      },
    });
  }
}
