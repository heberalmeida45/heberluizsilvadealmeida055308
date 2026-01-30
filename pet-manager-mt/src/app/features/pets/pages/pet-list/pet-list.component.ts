import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { PetFacade } from '../../../../facades/pet.facade';
import { CommonModule } from '@angular/common';
import { PetCardComponent } from '../../../../shared/components/pet-card/pet-card.component';
import { PetCard } from "../../../../shared/components/pet-card/pet-card";

@Component({
  selector: 'app-pet-list',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule, PetCardComponent], 
  templateUrl: './pet-list.component.html'
})
export class PetListComponent implements OnInit {
  searchControl = new FormControl('');
  currentPage = 0;

  constructor(
    public petFacade: PetFacade,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.petFacade.carregarPets(this.currentPage);

    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(value => {
      this.petFacade.carregarPets(0, value || '');
    });
  }

 
  irParaDetalhes(id: string) {
    this.router.navigate(['/pets', id]);
  }

  mudarPagina(proxima: boolean) {
    this.currentPage = proxima ? this.currentPage + 1 : Math.max(0, this.currentPage - 1);
    this.petFacade.carregarPets(this.currentPage, this.searchControl.value || '');
  }
}