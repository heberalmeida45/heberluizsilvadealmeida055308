import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class PetFormComponent implements OnInit {
  tutorIdVinculado: number | null = null;
  petForm: FormGroup;
  selectedFile: File | null = null;
  loading = false;

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
    this.route.queryParams.subscribe(params => {
      if (params['tutorId']) {
        this.tutorIdVinculado = +params['tutorId'];
        console.log('Tutor vinculado detectado:', this.tutorIdVinculado);
      }
    });
  }  
  onSubmit() {
    if (this.petForm.valid) {
      this.loading = true; 

      const dadosCompletos = {
        ...this.petForm.value,
        tutores: this.tutorIdVinculado ? [{ id: this.tutorIdVinculado }] : []
      };

      this.petService.cadastrar(dadosCompletos).subscribe({     
        next: (petSalvo) => {
          console.log('Pet salvo com ID:', petSalvo.id);  
          
          if (this.selectedFile && petSalvo.id) {   
            this.uploadFoto(Number(petSalvo.id));
          } else {
            this.sucesso();
          }
        },
        error: (err) => {
          this.loading = false;
          console.error('Erro ao cadastrar:', err);
          alert('Erro ao salvar pet. Verifique os dados.');
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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}