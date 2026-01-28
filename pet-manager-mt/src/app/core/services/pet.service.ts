import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet.model';

@Injectable({ providedIn: 'root' })
export class PetService {
  private readonly API = 'https://pet-manager-api.geia.vip/v1/pets';

  constructor(private http: HttpClient) {}

  // Listagem com paginação e filtro
  getPets(page: number = 0, nome?: string): Observable<Pet[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', '10');
    if (nome) params = params.set('nome', nome);
    return this.http.get<Pet[]>(this.API, { params });
  }

  getPetById(id: string): Observable<Pet> {
    return this.http.get<Pet>(`${this.API}/${id}`);
  }

  createPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.API, pet);
  }

  uploadFoto(id: string, foto: File): Observable<void> {
    const formData = new FormData();
    formData.append('foto', foto);
    return this.http.post<void>(`${this.API}/${id}/fotos`, formData);
  }
}