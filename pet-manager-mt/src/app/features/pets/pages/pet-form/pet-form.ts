import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PetService } from '../../../../core/services/pet.service';


@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pet-form.html'
})
export class PetFormComponent {
  petForm: FormGroup;
  selectedFile: File | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private router: Router
  ) {
    this.petForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      especie: ['Cão', Validators.required],
      raca: ['', Validators.required],
      idade: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.petForm.valid) {
      this.loading = true;
      
      // Primeiro cadastra o Pet
      this.petService.cadastrar(this.petForm.value).subscribe({
        next: (petSalvo) => {
          // Se houver foto, faz o upload usando o ID retornado
          if (this.selectedFile && petSalvo.id) {
            this.petService.uploadFoto(+petSalvo.id, this.selectedFile).subscribe({
              next: () => this.finalizar(),
              error: (err) => console.error('Erro no upload da foto', err)
            });
          } else {
            this.finalizar();
          }
        },
        error: (err) => {
          this.loading = false;
          alert('Erro ao cadastrar pet. Verifique se o login ainda é válido!');
        }
      });
    }
  }

  private finalizar() {
    alert('Pet cadastrado com sucesso em Mato Grosso!');
    this.router.navigate(['/pets']);
  }
}