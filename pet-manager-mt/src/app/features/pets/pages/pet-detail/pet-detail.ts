import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router'; 
import { Pet, Tutor } from '../../../../core/models/pet.model';
import { PetService } from '../../../../core/services/pet.service';

@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pet-detail.component.html'
})
export class PetDetailComponent implements OnInit {

  pet?: Pet;
  tutor?: Tutor;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute, 
    private petService: PetService  
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.carregarDados(id);
    }
  }

  carregarDados(id: string) {
    this.loading = true;
    this.petService.getPetById(id).subscribe({
      next: (dados) => {
        this.pet = dados;
        this.loading = false;
      
        if (dados.tutorId) {
          console.log('Este pet tem o tutor ID:', dados.tutorId);
        }
      },
      error: (err) => {
        console.error('Erro ao buscar pet:', err);
        this.loading = false;
      }
    });
  }
}