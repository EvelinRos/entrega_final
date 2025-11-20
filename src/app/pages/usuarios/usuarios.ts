import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css']
})
export class UsuariosPage {

  usuarios: any[] = [];
  cargando = true;
  error = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUsuarios().subscribe({
      next: (res: any) => {
        this.usuarios = res;
        this.cargando = false;
      },
      error: () => {
        this.error = "No se pudo obtener la lista de usuarios.";
        this.cargando = false;
      }
    });
  }
}
