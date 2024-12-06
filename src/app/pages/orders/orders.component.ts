import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TableOrdersComponent } from './table-orders/table-orders.component';
import moment from 'moment';
import { AuthService } from '../../core/services/auth.service';
import { PresupuestoService } from '../../core/services/presupuestos.service';
import { MessageSwal } from '../../utils/message';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  private authService = inject(AuthService);
  private presupuestoService = inject(PresupuestoService);
  private messageSwal = inject(MessageSwal);

  user = this.authService.usuario;
  rowSelected:any = null;
  filters = { date: '', status: '' };
  listOrders:any = [];
  filterDates = [
    {
      label: 'Todo',
      value: '',
    },
    {
      label: 'Últimos 3 meses',
      value: [
        moment().subtract(3, 'months').format('YYYY-MM-DD') + ' 00:00:00',
        moment().format('YYYY-MM-DD') + ' 23:59:59',
      ],
    },
    {
      label: 'Últimos 6 meses',
      value: [
        moment().subtract(6, 'months').format('YYYY-MM-DD') + ' 00:00:00',
        moment().format('YYYY-MM-DD') + ' 23:59:59',
      ],
    },
  ];
  filterStatus = [
    {
      label: 'Todos',
      value: '',
    },
    {
      label: 'Pendientes',
      value: 'PENDIENTE',
    },
    {
      label: 'Cancelado',
      value: 'CANCELADO',
    },
    {
      label: 'Aprobado',
      value: 'APROBADO',
    },
    {
      label: 'Finalizado',
      value: 'FINALIZADO',
    },
  ];

  ngOnInit(): void {
    this.getPresupuestos();
  }

  getPresupuestos() {
    let body:any = {
      ...this.filters,
    };
    if (this.user?.cargo == 'cliente') {
      body['id_usuario'] = this.user.id_usuario;
    }
    /* this.app.openLoader(); */
    this.presupuestoService.getPresupuestos(body).subscribe({
      next: async (res: any) => {

        
        /* this.app.closeLoader(); */
        this.listOrders = res;


        this.listOrders = this.listOrders.map((c:any) => {
          if (c.estado == 'FINALIZADO') {
            c.percentage = 100;
          } else if (c.fecha_creacion) {
            let days = moment(c.fecha_estimada).diff(c.fecha_creacion, 'days');
            let avance = moment().diff(c.fecha_creacion, 'days');
            c.percentage = (100 * avance) / days;
          }
          return c;
        });
        console.log('this.listOrders', this.listOrders);
      },
    });
  }

  getDocumentoPresupuesto(idPresupuestp:any){
    let body = {
      id_presupuesto: idPresupuestp
    }
    this.presupuestoService.getDocumentPresupuesto(body).subscribe({
      next: (res: any) => {
        /* this.app.closeLoader(); */
      },
      error: () => {
        /* this.app.closeLoader(); */
        this.messageSwal.showError(
          'Presupuesto',
          'Ha ocurrido un error al mostrar el presupuesto'
        );
      },
    });
  }

  abrirDoc(file:any) {
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.setAttribute('target', '_blank');
    link.href = environment.server_url + '/'+ file;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  updateStatus(event:any) {
    /* this.app.openLoader(); */
    this.presupuestoService.updateStatus(event).subscribe({
      next: (res: any) => {
        /* this.app.closeLoader(); */
        this.messageSwal.showSuccess(
          'Actualización de estado',
          `Se ha ${event.estado.toLowerCase()} la orden con éxito`
        );
        let index = this.listOrders.findIndex(
          (c:any) => c.id_presupuesto == event.id_presupuesto
        );
        if (index != -1) {
          this.listOrders[index].estado = event.estado;
          if (event.estado == 'CANCELADO') {
            this.listOrders[index].fecha_cancelacion = res['date'];
          }
          this.listOrders = this.listOrders.filter((c:any) => c);
/*           this.modalService.dismissAll(); */
        }
      },
      error: () => {
        /* this.app.closeLoader(); */
        this.messageSwal.showError(
          'Actualización de estado',
          'Ha ocurrido un error al actualizar el estado '
        );
      },
    });
  }

  info(row:any, content:any) {
    this.rowSelected = row;
/*     this.modalService
      .open(content, { centered: true, size: 'md' })
      .result.then((result) => {})
      .catch((res) => {}); */
  }

  rechazar(){
    Swal.fire({
      title: 'Confirme por favor',
      text: `¿Está seguro de cancelar este presupuesto?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro',
    }).then((result) => {
      if (result.isConfirmed) {
        let body = {
          estado: 'RECHAZADO',
          id_presupuesto: this.rowSelected.id_presupuesto,
          presupuesto: this.rowSelected,
        };
        this.updateStatus(body);
      } else {
        this.rowSelected.cancelar = false;
      }
    });
  }

  saveApr() {
    Swal.fire({
      title: 'Confirme por favor',
      text: `¿Está seguro de aprobar este presupuesto?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro',
    }).then((result) => {
      if (result.isConfirmed) {
        let body = {
          estado: 'ACEPTADO',
          id_presupuesto: this.rowSelected?.id_presupuesto,
          presupuesto: this.rowSelected,
        };
        this.updateStatus(body);
      } else {
        this.rowSelected.cancelar = false;
      }
    });
  }

}
