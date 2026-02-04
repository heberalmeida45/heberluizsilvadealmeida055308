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
}