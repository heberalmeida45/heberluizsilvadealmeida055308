import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Pet, Tutor } from '../../../../core/models/pet.model'; 
import { PetService } from '../../../../core/services/pet.service';
import { TutorService } from '../../../../core/services/tutor.service';

@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pet-detail.component.html'
})
export class PetDetailComponent implements OnInit {
  
 
  pet: Pet | undefined;
  tutor: Tutor | undefined;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private tutorService: TutorService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarDados(id);
    } else {
      this.loading = false;
    }
  }

  carregarDados(id: string) {
    this.loading = true;
    this.petService.getPetById(+id).subscribe({
      next: (dadosDoPet) => {
        this.pet = dadosDoPet;
        this.loading = false;
        if (dadosDoPet?.tutorId) {
          this.buscarTutor(dadosDoPet.tutorId);
        }
      },
      error: (err) => {
        console.error('Erro ao buscar pet:', err);
        this.loading = false;     
        this.pet = { id, nome: 'Pet de Teste', raca: 'SRD', especie: 'Cachorro', idade: 5 };
      }
    });
  }

  buscarTutor(tutorId: string) {
    this.tutorService.getTutorById(tutorId).subscribe({
      next: (dadosTutor) => this.tutor = dadosTutor,
      error: (err) => console.error('Erro ao buscar tutor:', err)
    });
  }
}