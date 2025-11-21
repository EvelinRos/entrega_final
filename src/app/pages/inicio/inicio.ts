import { Component } from '@angular/core';
import { TokioModal } from '../modales/tokio-modal/tokio-modal';
import { BaliModal } from '../modales/bali-modal/bali-modal';
import { BangkokModal } from '../modales/bangkok-modal/bangkok-modal';
import { SeulModal } from '../modales/seul-modal/seul-modal';
import { SingapurModal } from '../modales/singapur-modal/singapur-modal';
import { KiotoModal } from '../modales/kioto-modal/kioto-modal';
import { HalongModal } from '../modales/halong-modal/halong-modal';
import { PalawanModal } from '../modales/palawan-modal/palawan-modal';
import { RouterModule } from '@angular/router';
import { ReservaModal } from '../modales/reserva-modal/reserva-modal';

declare var bootstrap: any;

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule, ReservaModal,TokioModal, BaliModal, BangkokModal, SeulModal, SingapurModal, KiotoModal, HalongModal, PalawanModal],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class Inicio {
  openModal(modalId: string) {
  const dashFormat = document.getElementById(`modal-${modalId}`);
  const camelFormat = document.getElementById(`modal${modalId.charAt(0).toUpperCase() + modalId.slice(1)}`);
  
  const modalElement = dashFormat || camelFormat;

  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  } else {
    console.warn(`No se encontró el modal con ID modal-${modalId} ni modal${modalId.charAt(0).toUpperCase() + modalId.slice(1)}`);
  }
}

showReservationModal = false;

  selectedDestination = '';
  selectedPrice = 0;
  selectedDescription = '';

  abrirReserva(event: any) {
    this.selectedDestination = event.destino;
    this.selectedPrice = event.precio;
    this.selectedDescription = event.descripcion;

    this.showReservationModal = true;

    const modal = new (window as any).bootstrap.Modal(
      document.getElementById('modal-reserva')
    );
    modal.show();
  }

  cerrarReserva() {
    this.showReservationModal = false;
  }
  
  recibirReserva(data: any) {
      console.log("Reserva recibida:", data);
      
      alert(
        `Reserva confirmada:
    Destino: ${data.destino}
    Fecha: ${data.fecha}
    Viajeros: ${data.viajeros}
    Total: $${data.total}`
  );
}
}
