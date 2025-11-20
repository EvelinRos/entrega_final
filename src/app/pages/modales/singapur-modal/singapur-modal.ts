import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-singapur-modal',
  standalone: true,
  templateUrl: './singapur-modal.html',
  styleUrls: ['./singapur-modal.css']
})
export class SingapurModal {
  @Output() reservar = new EventEmitter<any>();

  enviarReserva() {
    this.reservar.emit({
      destino: 'Singapur',
      precio: 2200,
      descripcion: 'Singapur · 5 días'
    });
  }

}