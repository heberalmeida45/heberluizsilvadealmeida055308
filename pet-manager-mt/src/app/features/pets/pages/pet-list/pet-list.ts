import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PetFacade } from '../../../../facades/pet.facade';
import { PetCardComponent } from '../../../../shared/components/pet-card/pet-card.component';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule, 
    PetCardComponent
  ],
  templateUrl: './pet-list.component.html',
  styleUrl: './pet-list.scss'
})
export class PetList implements OnInit {
  
  searchControl = new FormControl('');
  currentPage = 0;

  constructor(public petFacade: PetFacade) {}

  ngOnInit(): void {
    this.petFacade.loadPets(this.currentPage);
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(nome => {
      this.petFacade.loadPets(0, nome || '');
      this.currentPage = 0;
    });
  }

  mudarPagina(proxima: boolean) {
    if (proxima) {
      this.currentPage++;
    } else if (this.currentPage > 0) {
      this.currentPage--;
    }
    
    this.petFacade.loadPets(this.currentPage, this.searchControl.value || '');
  }
}