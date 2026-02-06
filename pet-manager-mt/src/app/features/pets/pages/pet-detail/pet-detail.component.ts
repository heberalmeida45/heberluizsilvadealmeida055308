import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
[x: string]: any;
  
  pet: Pet | undefined;
  tutor: Tutor | undefined;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petService: PetService,
    private tutorService: TutorService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam && !isNaN(Number(idParam))) {
      this.carregarDados(idParam); 
    } else {
      this.router.navigate(['/pets']);
    }
  }

 carregarDados(id: string) {
  this.loading = true; 
  this.petService.getPetById(+id).subscribe({
    next: (dadosDoPet) => {
      this.pet = dadosDoPet;      
     
      if (dadosDoPet.tutores && dadosDoPet.tutores.length > 0) {
        this.tutor = dadosDoPet.tutores[0];
      }

      this.loading = false;
      this.cdr.detectChanges(); 
    },
    error: (err) => {
      this.loading = false;
      this.cdr.detectChanges();
      this.router.navigate(['/pets']);
    }
  });
}

  buscarTutor(tutorId: string) {
    this.tutorService.buscarPorId(tutorId).subscribe({
      next: (dadosTutor) => {
        this.tutor = dadosTutor;
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Erro ao buscar tutor:', err)
    });
  }
}