import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutor } from '../models/pet.model';

@Injectable({ providedIn: 'root' })
export class TutorService {
  private readonly API = 'https://pet-manager-api.geia.vip/v1/tutores';

  constructor(private http: HttpClient) {}

  getTutorById(id: string): Observable<Tutor> {
    return this.http.get<Tutor>(`${this.API}/${id}`);
  }

  createTutor(tutor: Tutor): Observable<Tutor> {
    return this.http.post<Tutor>(this.API, tutor);
  }
}