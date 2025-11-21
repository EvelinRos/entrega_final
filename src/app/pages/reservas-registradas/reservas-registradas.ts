import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reservas-registradas.html',
  styleUrls: ['./reservas-registradas.css']
})
export class ReservasPage {
  reservas: any[] = [];
  cargando = true;
  error = '';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getReservas().subscribe({
      next: (res: any) => {
        this.reservas = res;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo obtener la lista de reservas.';
        this.cargando = false;
      }
    });
  }
}
