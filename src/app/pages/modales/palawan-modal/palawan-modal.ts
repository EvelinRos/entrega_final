import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-palawan-modal',
  standalone: true,
  templateUrl: './palawan-modal.html',
  styleUrls: ['./palawan-modal.css']
})
export class PalawanModal {
  @Output() reservar = new EventEmitter<any>();
  
    enviarReserva() {
      this.reservar.emit({
        destino: 'Palawan',
        precio: 1100,
        descripcion: 'Filipinas · 6 días'
      });
    }

}