import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-reserva-modal',
  standalone: true,
  templateUrl: './reserva-modal.html',
  styleUrls: ['./reserva-modal.css'],
  imports: [CommonModule, FormsModule]
})
export class ReservaModal {
  private auth = inject(AuthService);

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
    const reserva = {
      destino: this.destino,
      descripcion: this.descripcion,
      precio: this.precio,
      viajeros: this.viajeros,
      fecha: this.fecha,
      total: this.total
    };

    // Enviar al backend
    this.auth.enviarReserva(reserva).subscribe({
      next: () => {
        alert('¡Reserva registrada correctamente!');
        this.confirm.emit(reserva);
        this.cerrar();
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar la reserva.');
      }
    });
  }

  cerrar() {
    this.close.emit();
  }

}