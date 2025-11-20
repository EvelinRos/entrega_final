import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bangkok-modal',
  standalone: true,
  templateUrl: './bangkok-modal.html',
  styleUrls: ['./bangkok-modal.css']
})
export class BangkokModal {
  @Output() reservar = new EventEmitter<any>();
  
    enviarReserva() {
      this.reservar.emit({
        destino: 'Bangkok',
        precio: 950,
        descripcion: 'Tailandia · 4 días'
      });
    }

}