import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tokio-modal',
  standalone: true,
  templateUrl: './tokio-modal.html',
  styleUrls: ['./tokio-modal.css']
})
export class TokioModal {
  @Output() reservar = new EventEmitter<any>();

  enviarReserva() {
    this.reservar.emit({
      destino: 'Tokio',
      precio: 2800,
      descripcion: 'Japón · 5 días'
    });
  }
}