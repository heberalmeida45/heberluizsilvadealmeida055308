import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PetService } from '../../../../core/services/pet.service';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './pet-form.html'
})
export class PetFormComponent implements OnInit {
  petForm: FormGroup;
  isEditMode = false;
  petId?: string;
  selectedFile?: File;

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Inicializa o formulário com validações
    this.petForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      especie: ['', Validators.required],
      idade: [null, [Validators.required, Validators.min(0)]],
      raca: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.petId = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.petId) {
      this.isEditMode = true;
      this.carregarDadosParaEdicao(this.petId);
    }
  }

  carregarDadosParaEdicao(id: string) {
    this.petService.getPetById(id).subscribe(pet => {
      this.petForm.patchValue(pet); // Preenche o form com os dados do pet
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  salvar() {
    if (this.petForm.invalid) return;

    const petData = this.petForm.value;
    
    if (this.isEditMode && this.petId) {
      // Lógica de PUT (Edição) - Implementaremos no PetService se necessário
      console.log('Editando pet', petData);
    } else {
      // Lógica de POST (Criação)
      this.petService.createPet(petData).subscribe(newPet => {
        if (this.selectedFile && newPet.id) {
          this.uploadFoto(newPet.id);
        } else {
          this.router.navigate(['/pets']);
        }
      });
    }
  }

  uploadFoto(id: string) {
    if (!this.selectedFile) return;
    this.petService.uploadFoto(id, this.selectedFile).subscribe(() => {
      this.router.navigate(['/pets']);
    });
  }
}