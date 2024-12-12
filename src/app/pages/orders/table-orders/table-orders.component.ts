import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output, signal, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import moment from 'moment';
import { environment } from '../../../../environments/environment';
import { PresupuestoService } from '../../../core/services/presupuestos.service';
import { MessageSwal } from '../../../utils/message';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { PaginacionTraduccionService } from '../../../core/services/paginacionTraduccion.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-table-orders',
  imports: [MatInputModule, MatNativeDateModule, MatDatepickerModule, MatFormFieldModule, MatProgressSpinnerModule, MatDialogModule, CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './table-orders.component.html',
  styleUrl: './table-orders.component.scss'
})
export class TableOrdersComponent implements OnInit{
  @Input() data:any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  editarDocumento: boolean = false;
  dateEstimate: string = '';
  displayedColumns: string[] = ["codigo", "cliente", "fecha_creado", "estado", "enviar", "aprobar", "cancelar", "finalizar"];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  presupuesto: any;
  presupuestoBefore: any;
  @Output() updateStatus = new EventEmitter();
  selectedFiles: any = [];
  hoy = signal<any>(moment(new Date()).format("YYYY-MM-DD"));

  private presupuestoService = inject(PresupuestoService);
  private messageSwal = inject(MessageSwal);
  private dialog = inject(MatDialog);
  private paginationService = inject(PaginacionTraduccionService);

  loading = signal<boolean>(false);
  loadingDate = signal<boolean>(false);

  constructor() {
    this.paginationService.setupPaginatorIntl();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
    }
  }

  async show(row:any) {
    this.presupuestoBefore = row;
    const reader = new FileReader();
    let json = {
      ...row,
      dateUpload: moment().format('YYYY-MM-DD HH:mm:ss'),
      file: row.file,
      name: row.file.nombre_original,
      dataURL: row.file.ruta
    };
    this.presupuesto = json;
/*     this.modalService
      .open(content, { centered: true, size: 'md' })
      .result.then((result) => {})
      .catch((res) => {}); */
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

  editDoc(item: any) {
    this.editarDocumento = true;
    this.presupuesto = item;
  }

  updatePresupuesto() {
    let body = {
      id_presupuesto: this.presupuesto.id_presupuesto
    }
    let formData =  new FormData();
    formData.append('files', this.presupuesto.file)
    formData.append('data', JSON.stringify(body));
/*     this.app.openLoader(); */
    this.presupuestoService.updatesaveDocumentPresupuesto(formData).subscribe({
      next: (res: any) => {
 /*        this.app.closeLoader(); */
        if (!res['ok']) {
          this.messageSwal.showInfo(
            'Registro de presupuesto',
            'Ha ocurrido un error al cargar el presupuesto'
          );
          return;
        }
     /*    this.modalService.dismissAll(); */
        this.messageSwal.showSuccess(
          'Registro de presupuesto',
          'Documentos de descarga registrados con éxito'
        );
      },
      error: () => {
   /*      this.app.closeLoader(); */
        this.messageSwal.showError(
          'Registro de presupuesto',
          'Ha ocurrido un error al registrar el presupuesto'
        );
      },
    });
  }

  openDialog(item:any, template: TemplateRef<any>): void {
    this.loading.set(false);
    this.selectedFiles = [];
    let json = {
      ...item,
      dateUpload: moment().format('YYYY-MM-DD HH:mm:ss'),
      file: item.file,
      name: item.file.nombre_original,
      ruta: item.file.ruta
    };
    this.presupuesto = json;
    if (item.file.id_documento_presupuesto) {
      this.selectedFiles.push(item.file);
    }
    this.presupuestoBefore = item;
    this.dialog.open( template,{
      width: "500px",
      disableClose: true,

    });
  }

  openDialogAprobar(item:any, template: TemplateRef<any>): void {
    this.presupuestoBefore = item;
    this.dialog.open( template,{
      width: "500px",
      disableClose: true,
    });
  }


  onFileSelected(event: Event): void {
    const input: any = event.target as HTMLInputElement;
    let filesPermitidos:any = [];
    filesPermitidos = [
      "text/plain",
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

      if (input.files && input.files.length > 0) {
        const arrayFiles:any = Array.from(input.files);
        const filteredFiles = arrayFiles.filter((file:any) => filesPermitidos.includes(file.type));
        this.selectedFiles = filteredFiles;

        if (filteredFiles.length !== arrayFiles.length) {
         /*  this.toastr.error("Algunos archivos tienen un tipo no permitido", "Error!"); */
        }
      } else {
        this.selectedFiles = null;
      }
  }

  cargarPresupuesto() {
    const body = {
      estado: 'ENVIADO',
      id_presupuesto: this.presupuestoBefore.id_presupuesto,
      presupuesto: this.presupuestoBefore
    }


    let formData =  new FormData();
    formData.append('data', JSON.stringify(body));
    if (this.selectedFiles) {
      this.selectedFiles.forEach((file:any) => {
        formData.append(`files`, file);
      });
    }
    this.loading.set(true);
/*     this.app.openLoader(); */
    this.presupuestoService.saveDocumentPresupuesto(formData).subscribe({
      next: (res: any) => {
  /*       this.app.closeLoader(); */
        if (!res['ok']) {
          this.messageSwal.showInfo(
            'Registro de presupuesto',
            'Ha ocurrido un error al cargar el presupuesto'
          );
          return;
        }
      
        this.messageSwal.showSuccess(
          'Registro de presupuesto',
          'Documentos de descarga registrados con éxito'
        );
      
        let index = this.data.findIndex(
          (c:any) => c.id_presupuesto == this.presupuestoBefore.id_presupuesto
        );
        if (index != -1) {
          this.data = this.data.filter((c:any) => c);
          this.data[index].estado = 'ENVIADO';
/*           this.modalService.dismissAll(); */
        }
        this.dialog.closeAll();
      },
      error: () => {
     /*    this.app.closeLoader(); */
        this.messageSwal.showError(
          'Registro de presupuesto',
          'Ha ocurrido un error al registrar el presupuesto'
        );
      },
    });
  }

  cancel(row:any) {
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
          estado: 'CANCELADO',
          presupuesto: row,
          id_presupuesto: row.id_presupuesto,
        };
        this.updateStatus.emit(body);
      } else {
        row.cancelar = false;
      }
    });
  }

  finish(row:any) {
    Swal.fire({
      title: 'Confirme por favor',
      text: `¿Está seguro de finalizar este pedido?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro',
    }).then((result) => {
      if (result.isConfirmed) {
        let body = {
          estado: 'FINALIZADO',
          id_presupuesto: row.id_presupuesto,
          presupuesto:row
        };
        this.updateStatus.emit(body);
      } else {
        row.cancelar = false;
      }
    });
  }

  filtrarFechas = (fecha: Date | null): boolean => {
    if (!fecha) {
      return false;
    }
    const hoy = new Date(); // Fecha actual
    hoy.setHours(0, 0, 0, 0); // Reiniciar horas para comparar solo la fecha
    return fecha >= hoy; // Permitir solo fechas de hoy o futuras
  };

  cambiarFechaDocumentosFichajes(event :any) {
    const fechaSeleccionada = new Date(event.value);

    const year = fechaSeleccionada.getFullYear();
    const month = (fechaSeleccionada.getMonth() + 1).toString().padStart(2, '0'); // Meses son base 0
    const day = fechaSeleccionada.getDate().toString().padStart(2, '0');

    this.dateEstimate = `${year}-${month}-${day}`;
    this.loadingDate.set(true);
  }

  saveApr() {
    if (!this.dateEstimate) return;
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
          estado: 'APROBADO',
          fecha_estimada: this.dateEstimate,
          id_presupuesto: this.presupuestoBefore.id_presupuesto,
          presupuesto: this.presupuestoBefore
        };
        this.updateStatus.emit(body);
        this.dialog.closeAll();
      } else {
        this.presupuestoBefore.cancelar = false;
      }
    });
  }

  private dateToString = (date: any) =>
    `${date.year}-${date.month}-${date.day}`;

}
