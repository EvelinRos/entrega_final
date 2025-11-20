import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reserva-modal',
  standalone: true,
  templateUrl: './reserva-modal.html',
  styleUrls: ['./reserva-modal.css'],
  imports: [CommonModule, FormsModule]
})
export class ReservaModal {

  @Input() destino = '';
  @Input() precio = 0;
  @Input() descripcion = '';
  @Input() show = false;

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<any>();

  viajeros: any = 1;
  opcionesViajeros = [1, 2, 3, 4, 5, '6+'];
  total = 0;

  fecha: string = '';

  ngOnChanges() {
    this.calcularTotal();
  }

  calcularTotal() {
    if (this.viajeros === '6+') {
      this.total = this.precio * 6;
    } else {
      this.total = this.precio * Number(this.viajeros);
    }
  }

  confirmarReserva() {
    this.confirm.emit({
      destino: this.destino,
      descripcion: this.descripcion,
      precio: this.precio,
      viajeros: this.viajeros,
      fecha: this.fecha,
      total: this.total
    });
    alert('¡Reserva exitosa!');
    this.cerrar();
  }

  cerrar() {
    this.close.emit();
  }

}