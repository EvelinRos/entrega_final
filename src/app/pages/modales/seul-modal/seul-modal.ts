import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-seul-modal',
  standalone: true,
  templateUrl: './seul-modal.html',
  styleUrls: ['./seul-modal.css']
})
export class SeulModal {
  @Output() reservar = new EventEmitter<any>();

  enviarReserva() {
    this.reservar.emit({
      destino: 'Séul',
      precio: 1800,
      descripcion: 'Corea del Sur · 6 días'
    });
  }

}