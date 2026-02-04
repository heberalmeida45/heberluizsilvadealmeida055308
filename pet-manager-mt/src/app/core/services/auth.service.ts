import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/pet.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  
  private readonly URL_PETS = 'https://pet-manager-api.geia.vip/v1/pets';
  private readonly URL_AUTH = environment.apiAuth;
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  API_AUTH: any;

  constructor(private http: HttpClient) {}

login(username: string, password: string) {
  const urlFinal = this.URL_AUTH + '/login';
    
    return this.http.post<any>(urlFinal, { username, password }).pipe(
      tap(res => {
        if (res && res.access_token) {
          localStorage.setItem('token', res.access_token);
          console.log('Login realizado com sucesso! Token salvo.');
      }
    })
  );
}

  refreshToken() {
    const refresh = localStorage.getItem('refreshToken');
    return this.http.put<AuthResponse>(`${this.URL_AUTH}/autenticacao/refresh`, { refresh })
      .pipe(tap(res => this.saveTokens(res)));
  }

  private saveTokens(res: AuthResponse) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('refreshToken', res.refreshToken);
    this.tokenSubject.next(res.token);
  }
  getPets() {
  return this.http.get(`${this.URL_PETS}?page=0&size=10`);
}

  getToken() { return this.tokenSubject.value; }
}