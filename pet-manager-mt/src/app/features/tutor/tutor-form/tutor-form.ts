import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TutorService } from '../../../core/services/tutor.service';

@Component({
  selector: 'app-tutor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tutor-form.html'
})
export class TutorFormComponent {
  tutorForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private tutorService: TutorService,
    private router: Router
  ) {
  
    this.tutorForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]] 
    });
  }

 salvarTutor() {
  if (this.tutorForm.valid) {
    this.loading = true;    
    
    const dadosParaEnviar = {
      ...this.tutorForm.value,    
      cpf: Number(this.tutorForm.value.cpf.replace(/\D/g, ''))
    };

    console.log('Dados que estão saindo para a API:', dadosParaEnviar);

   this.tutorService.createTutor(dadosParaEnviar).subscribe({
  next: (tutorCriado) => {
    alert('Tutor cadastrado! Agora vamos cadastrar o pet.');   
    this.router.navigate(['/pets/novo'], { queryParams: { tutorId: tutorCriado.id } });
  },
  error: (err) => {
    this.loading = false;
    alert('Erro ao salvar tutor.');
  }
});
  }
}
}