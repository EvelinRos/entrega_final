import { Component,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bali-modal',
  standalone: true,
  templateUrl: './bali-modal.html',
  styleUrls: ['./bali-modal.css']
})
export class BaliModal {
  @Output() reservar = new EventEmitter<any>();

  enviarReserva() {
    this.reservar.emit({
      destino: 'Bali',
      precio: 1200,
      descripcion: 'Indonesia · 5 días'
    });
  }
}