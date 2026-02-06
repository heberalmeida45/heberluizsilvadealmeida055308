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
  petId: number | null = null;
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
    // 1. Verifica se é edição (ID na rota)
    this.petId = this.route.snapshot.params['id'];
    if (this.petId) {
      this.isEdicao = true;
      this.carregarDadosParaEdicao(this.petId);
    }

    // 2. Verifica se há um tutor para vincular (vindo da tela de Tutor)
    this.route.queryParams.subscribe(params => {
      if (params['tutorId']) {
        this.tutorIdVinculado = +params['tutorId'];
        console.log('Tutor vinculado detectado:', this.tutorIdVinculado);
      }
    });
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

    // Lógica para EDICÃO
    if (this.isEdicao && this.petId) {  
      this.petService.atualizar(this.petId, this.petForm.value).subscribe({
        next: () => this.prosseguirAposCadastro(this.petId!),
        error: () => {
          this.loading = false;
          alert('Erro ao atualizar pet.');
        }
      });
    } 
    // Lógica para NOVO CADASTRO
    else {
      const dadosCompletos = {
        ...this.petForm.value,
        tutores: this.tutorIdVinculado ? [{ id: this.tutorIdVinculado }] : []
      };

      this.petService.cadastrar(dadosCompletos).subscribe({     
        next: (petSalvo) => {
          const idGerado = petSalvo.id;
          this.prosseguirAposCadastro(idGerado);
        },
        error: (err) => {
          this.loading = false;
          alert('Erro ao salvar pet. Verifique os dados.');
        }
      });
    }
  }

  private prosseguirAposCadastro(petId: number) {
    if (this.selectedFile) {
      this.uploadFoto(petId);
    } else {
      this.sucesso();
    }
  }

  private uploadFoto(id: number) {
    this.petService.uploadFoto(id, this.selectedFile!).subscribe({
      next: () => this.sucesso(),
      error: () => {
        alert('Dados salvos, mas houve erro no upload da foto.');
        this.sucesso(); 
      }
    });
  }

  public sucesso() {
    this.loading = false;
    alert(this.isEdicao ? 'Pet atualizado!' : 'Pet cadastrado com sucesso!');
    this.router.navigate(['/pets']); 
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
}