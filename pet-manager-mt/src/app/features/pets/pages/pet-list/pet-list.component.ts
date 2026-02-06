import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { PetCardComponent } from '../../../../shared/components/pet-card/pet-card.component';
import { PetFacade } from '../../../../facades/pet.facade';
import { PetService } from '../../../../core/services/pet.service';


@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule, 
    PetCardComponent     
  ],
  templateUrl: './pet-list.component.html'
})
export class PetListComponent implements OnInit {  
  searchControl = new FormControl('');
  currentPage: number = 0;

  constructor(
    public petFacade: PetFacade, 
    private petService: PetService,
  ) {}

  ngOnInit(): void {
    this.petFacade.loadPets(this.currentPage);

    this.searchControl.valueChanges.subscribe(valor => {
      this.petFacade.loadPets(0, valor || '');
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

  excluir(pet: any) {
    if (confirm(`Tem certeza que deseja excluir o pet ${pet.nome}?`)) {
      this.petService.excluirPet(pet.id).subscribe({
        next: () => {
          alert('Pet excluído!');        
          this.petFacade.loadPets(this.currentPage, this.searchControl.value || '');
        },
        error: (err) => {
          console.error('Erro ao excluir:', err);
          alert('Erro ao excluir pet. Verifique se ele possui vínculos.');
        }
      });
    }
  }
}