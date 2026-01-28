import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthResponse } from '../models/pet.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = 'https://pet-manager-api.geia.vip';
  // BehaviorSubject mantém o estado do token para o Padrão Facade futuramente
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

  login(credentials: any) {
    return this.http.post<AuthResponse>(`${this.API}/autenticacao/login`, credentials)
      .pipe(tap(res => this.saveTokens(res)));
  }

  refreshToken() {
    const refresh = localStorage.getItem('refreshToken');
    return this.http.put<AuthResponse>(`${this.API}/autenticacao/refresh`, { refresh })
      .pipe(tap(res => this.saveTokens(res)));
  }

  private saveTokens(res: AuthResponse) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('refreshToken', res.refreshToken);
    this.tokenSubject.next(res.token);
  }

  getToken() { return this.tokenSubject.value; }
}