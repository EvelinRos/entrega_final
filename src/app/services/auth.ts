import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res: any) => {
        const token = res?.token; 
        if (token) {
          this.saveToken(token);
        }
      })
    );
  }

  saveToken(token: string) {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem(this.tokenKey, token);
      }
    } catch (e) {
      console.warn('No se pudo guardar token en localStorage', e);
    }
  }

   removeToken() {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.removeItem(this.tokenKey);
      }
    } catch {}
  }

  getToken(): string | null {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        return localStorage.getItem(this.tokenKey);
      }
    } catch {
      return null;
    }
    return null;
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

  isTokenExpired(token?: string): boolean {
    const t = token || this.getToken();
    if (!t) return true;
    const payload: any = this.decodePayload(t);
    if (!payload || !payload.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  }

  isLoggedIn(): boolean {
    const t = this.getToken();
    if (!t) return false;
    return !this.isTokenExpired(t);
  }
}