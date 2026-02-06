import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PetService } from '../../../../core/services/pet.service';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pet-form.html'
})
export class PetFormComponent implements OnInit {
  tutorIdVinculado: number | null = null;
  petForm: FormGroup;
  selectedFile: File | null = null;
  loading = false;
  petId: number | null = null; // Guardar o ID se for edição
  isEdicao = false;

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private router: Router,
    private route: ActivatedRoute 
  ) {
    this.petForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      especie: ['Cão', Validators.required],
      raca: ['', Validators.required],
      idade: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {   
    this.petId = this.route.snapshot.params['id'];
    if (this.petId) {
      this.isEdicao = true;
      this.carregarDadosParaEdicao(this.petId);
    }
 const tutorIdVinculado = this.route.snapshot.queryParams['tutorId'];    
      if (tutorIdVinculado) {      
        this.petForm.patchValue({ tutorId: tutorIdVinculado });
      }   
  }

  private carregarDadosParaEdicao(id: number) {
    this.loading = true;
    this.petService.buscarPorId(id).subscribe({
      next: (pet) => {
        this.petForm.patchValue(pet); 
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Erro ao carregar dados do pet.');
      }
    });
  }

  onSubmit() {
    if (this.petForm.invalid) return;
    this.loading = true;

    if (this.isEdicao && this.petId) {  
      this.petService.atualizar(this.petId, this.petForm.value).subscribe({
        next: () => {
          console.log('Pet atualizado com sucesso!');
          this.prosseguirAposCadastro(this.petId!);
        },
        error: (err) => {
          this.loading = false;
          alert('Erro ao atualizar pet.');
        }
      });
    } else {
          this.petService.cadastrar(this.petForm.value).subscribe({
        next: (petSalvo) => {
          const petId = petSalvo.id;
          if (this.tutorIdVinculado && petId) {
            this.executarVinculo(this.tutorIdVinculado, petId);
          } else {
            this.prosseguirAposCadastro(petId);
          }
        },
        error: (err) => {
          this.loading = false;
          alert('Erro ao salvar pet.');
        }
      });
    }
  }

  private executarVinculo(tutorId: number, petId: number) {
    this.petService.vincularTutor(tutorId, petId).subscribe({
      next: () => this.prosseguirAposCadastro(petId),
      error: () => this.prosseguirAposCadastro(petId)
    });
  }

  private prosseguirAposCadastro(petId: number) {
    if (this.selectedFile && petId) {
      this.uploadFoto(petId);
    } else {
      this.sucesso();
    }
  }

  private uploadFoto(id: number) {
    this.petService.uploadFoto(id, this.selectedFile!).subscribe({
      next: () => this.sucesso(),
      error: () => this.sucesso() 
    });
  }

 public sucesso() {
  this.loading = false;
  this.router.navigate(['/pets']); 
}

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
}