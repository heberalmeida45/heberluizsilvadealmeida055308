import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PetFacade } from '../../../../facades/pet.facade';
import { PetCardComponent } from '../../../../shared/components/pet-card/pet-card.component';
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
  templateUrl: './pet-list.component.html',
  styleUrl: './pet-list.scss'
})
export class PetList implements OnInit {
  
  searchControl = new FormControl('');
  currentPage = 0;

  constructor(
    public petFacade: PetFacade,
    private petService: PetService 
  ) {}

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

  excluir(pet: any) {
    if (confirm(`Deseja realmente excluir o pet "${pet.nome}"?`)) {    
      
      // Lógica importante: Se o pet tem foto, removemos a foto primeiro
      if (pet.foto && pet.foto.id) {
        this.petService.excluirFoto(pet.id, pet.foto.id).subscribe({
          next: () => {
            console.log('Foto removida, agora excluindo o pet...');
            this.executarExclusaoFinal(pet.id);
          },
          error: (err) => {
            console.error('Erro ao remover foto, tentando excluir pet mesmo assim:', err);         
            this.executarExclusaoFinal(pet.id);
          }
        });
      } else {
        this.executarExclusaoFinal(pet.id);
      }
    }
  }

  private executarExclusaoFinal(petId: number) {
    this.petService.excluirPet(petId).subscribe({
      next: () => {
        alert('Pet removido com sucesso!');
        // Recarrega a lista usando a Facade para atualizar a tela
        this.petFacade.loadPets(this.currentPage, this.searchControl.value || '');
      },
      error: (err) => {
        alert('Erro ao excluir pet. O servidor ainda detecta vínculos ativos.');
      }
    });
  }
}