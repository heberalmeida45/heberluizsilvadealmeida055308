import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutor } from '../models/pet.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  private readonly apiUrl = `${environment.apiUrl}/tutores`;

  constructor(private http: HttpClient) {}

  getTutores(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(this.apiUrl);
<<<<<<< HEAD
  }
 
  getTutorById(id: number | string): Observable<Tutor> {
    return this.http.get<Tutor>(`${this.apiUrl}/${id}`);
  }
  createTutor(tutor: Tutor): Observable<Tutor> {   
    return this.http.post<Tutor>(this.apiUrl, tutor);
  }
  updateTutor(id: number, tutor: Tutor): Observable<Tutor> {
    return this.http.put<Tutor>(`${this.apiUrl}/${id}`, tutor);
  }

listarTutores(page: number = 0, nome: string = ''): Observable<any> { 
    return this.http.get(`${this.apiUrl}?page=${page}&size=10`);
=======
  }
 
  getTutorById(id: number | string): Observable<Tutor> {
    return this.http.get<Tutor>(`${this.apiUrl}/${id}`);
  }
  createTutor(tutor: Tutor): Observable<Tutor> {   
    return this.http.post<Tutor>(this.apiUrl, tutor);
  }
  updateTutor(id: number, tutor: Tutor): Observable<Tutor> {
    return this.http.put<Tutor>(`${this.apiUrl}/${id}`, tutor);
>>>>>>> deb8838b68351c5a7ca028964bc7cd557a5cc154
  }

buscarPorId(id: number | string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

atualizar(id: number, tutor: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, tutor);
  }


  excluir(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

 uploadFoto(id: number, file: File): Observable<any> {
  const formData = new FormData();
  formData.append('foto', file); 
  return this.http.post(`${this.apiUrl}/${id}/fotos`, formData);
}

  excluirFoto(tutorId: number, fotoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${tutorId}/fotos/${fotoId}`);
  }

vincularPet(tutorId: number, petId: number): Observable<any> {
  return this.http.post(`${this.apiUrl}/${tutorId}/pets/${petId}`, {});
}

removerVinculoPet(tutorId: number, petId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${tutorId}/pets/${petId}`);
}
}