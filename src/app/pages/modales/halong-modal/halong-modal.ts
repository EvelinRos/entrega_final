import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-halong-modal',
  standalone: true,
  templateUrl: './halong-modal.html',
  styleUrls: ['./halong-modal.css']
})
export class HalongModal {
  @Output() reservar = new EventEmitter<any>();

  enviarReserva() {
    this.reservar.emit({
      destino: 'Ha Long',
      precio: 800,
      descripcion: 'Vietnam · 3 días'
    });
  }
}