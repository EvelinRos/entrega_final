import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'token';
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  // ------- REGISTRO -------
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, data);
  }

  // ------- LOGIN -------
  login(credentials: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
        tap((response: any) => {
          const token = response.token;

          sessionStorage.setItem("token", token);

          const expiresAt = Date.now() + 5 * 60 * 1000;
          sessionStorage.setItem("token_expires", String(expiresAt));
      })
    );
  }

  // Obtener token
  getToken(): string | null {
    return sessionStorage.getItem("token");
  }

  // Decodificar token
  getDecodedToken(token: string) {
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }

  // Validar expiración
  isTokenExpired(): boolean {
    const expires = sessionStorage.getItem("token_expires");
    if (!expires) return true;
    return Date.now() > Number(expires);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired();
  }

  logout(): void {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("token_expires");
    window.location.href = '/login';
  }

  getUsuarios() {
  return this.http.get(`${this.apiUrl}/usuarios`);
  }

  getReservas() {
    const token = this.getToken();
    return this.http.get(`${this.apiUrl}/reservas-registradas`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  enviarReserva(data: any) {
    const token = this.getToken();
    return this.http.post(`${this.apiUrl}/reserva-modal`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  private decodePayload(token: string) {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const payload = parts[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(
        decodeURIComponent(
          decoded
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        )
      );
    } catch {
      return null;
    }
  }
}