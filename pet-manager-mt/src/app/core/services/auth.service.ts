import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/pet.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = 'https://pet-manager-api.geia.vip';
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  API_AUTH: any;

  constructor(private http: HttpClient) {}

login(usuario: string, senha: string) {
  const corpoDaRequisicao = { 
    username: usuario, 
    password: senha 
  };

  return this.http.post<any>(`https://pet-manager-api.geia.vip/autenticacao/login`, corpoDaRequisicao).pipe(
   tap(res => { 
  
  if (res && res.access_token) {
    localStorage.setItem('token', res.access_token);   
  }
})
  );
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