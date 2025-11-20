import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-kioto-modal',
  standalone: true,
  templateUrl: './kioto-modal.html',
  styleUrls: ['./kioto-modal.css']
})
export class KiotoModal {
  @Output() reservar = new EventEmitter<any>();

  enviarReserva() {
    this.reservar.emit({
      destino: 'Kioto',
      precio: 2400,
      descripcion: 'Japón · 5 días'
    });
  }
}