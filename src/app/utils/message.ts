import { Injectable } from '@angular/core'
import Swal from 'sweetalert2'

@Injectable()
export class MessageSwal {
  showSuccess(title: string, text: string, duracion?: number) {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: duracion || 3000,
      title: title,
      text: text,
      icon: 'success',
    })
  }
  showError(title: string, text: string, duracion?: number) {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: duracion || 3000,
      title: title,
      text: text,
      icon: 'error',
    })
  }
  showInfo(title: string, text: string, duracion?: number) {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: duracion || 3000,
      title: title,
      text: text,
      icon: 'info',
    })
  }
  showWarning(title: string, text: string, duracion?: number) {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: duracion || 3000,
      title: title,
      text: text,
      icon: 'warning',
    })
  }
}
