import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { Pet } from '../core/models/pet.model';
import { PetService } from '../core/services/pet.service';

@Injectable({ providedIn: 'root' })
export class PetFacade {
  // Estado privado
  private readonly _pets = new BehaviorSubject<Pet[]>([]);
  private readonly _loading = new BehaviorSubject<boolean>(false);

  // Observables públicos (o componente só "ouve")
  readonly pets$ = this._pets.asObservable();
  readonly loading$ = this._loading.asObservable();

  constructor(private petService: PetService) {}

  carregarPets(page: number = 0, nome?: string) {
    this._loading.next(true);
    this.petService.getPets(page, nome)
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe({
        next: (res) => this._pets.next(res),
        error: (err) => console.error('Erro ao carregar pets', err)
      });
  }
}