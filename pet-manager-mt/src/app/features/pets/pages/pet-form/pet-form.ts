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

  // No seu pet-form.component.ts
onSubmit() {
  if (this.petForm.valid) {
    this.loading = true; 
    this.petService.cadastrar(this.petForm.value).subscribe({     
next: (petSalvo) => {
  console.log('Pet salvo com ID:', petSalvo.id);  
  if (this.selectedFile && petSalvo.id !== undefined) {   
    const idNumerico = Number(petSalvo.id); 
    this.uploadFoto(idNumerico);
  } else {
    this.sucesso();
  }
},
      error: (err) => {
        this.loading = false;
        console.error('Erro ao cadastrar:', err);
        alert('Erro ao salvar pet. Verifique se todos os campos estão corretos.');
      }
    });
  }
}

private uploadFoto(id: number) {
  this.petService.uploadFoto(id, this.selectedFile!).subscribe({
    next: () => this.sucesso(),
    error: () => {
      alert('Pet cadastrado, mas houve erro ao subir a foto.');
      this.sucesso(); 
    }
  });
}

private sucesso() {
  this.loading = false;
  this.router.navigate(['/pets']); 
}
}