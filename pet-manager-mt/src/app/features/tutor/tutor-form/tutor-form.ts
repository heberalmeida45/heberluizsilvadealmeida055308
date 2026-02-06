import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TutorService } from '../../../core/services/tutor.service';

@Component({
  selector: 'app-tutor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tutor-form.html'
})
export class TutorFormComponent implements OnInit {
  tutorForm: FormGroup;
  loading = false;
  isEdicao = false;
  tutorId: number | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private tutorService: TutorService,
    private router: Router,
    private route: ActivatedRoute, 
    private location: Location
  ) {
    this.tutorForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      cpf: ['', [Validators.required]] 
    });
  }

 ngOnInit(): void {

  this.loading = false; 
  const id = this.route.snapshot.params['id'];
  
  if (id) {
    this.isEdicao = true;
    this.tutorId = id;
    this.carregarDadosParaEdicao(id);
  } else {
    this.isEdicao = false;
    this.tutorId = null;
    this.tutorForm.reset();
  }
}

petsVinculados: any[] = [];

private carregarDadosParaEdicao(id: number) {
  this.loading = true;
  
  this.tutorService.buscarPorId(id).subscribe({
    next: (tutor) => {
      if (tutor) {
        this.tutorForm.patchValue({
          nome: tutor.nome,
          email: tutor.email,
          telefone: tutor.telefone,
          endereco: tutor.endereco,
          cpf: tutor.cpf
        });      
        this.petsVinculados = tutor.pets || []; 
        
        this.formatarCamposIniciais();
      }
      this.loading = false;
    },
    error: (err) => {
      this.loading = false;
      console.error('Erro ao buscar tutor por ID:', err);
      alert('Não foi possível encontrar este tutor na base da GEIA.');
      this.location.back(); 
    }
  });
}

salvarTutor() {
  if (this.tutorForm.invalid) return;

  this.loading = true;   
  const dados = { 
    ...this.tutorForm.value,
    cpf: this.tutorForm.value.cpf.replace(/\D/g, ''),
    telefone: this.tutorForm.value.telefone.replace(/\D/g, '')
  };

  const operacao = this.isEdicao 
    ? this.tutorService.atualizar(this.tutorId!, dados) 
    : this.tutorService.createTutor(dados);

  operacao.subscribe({
   next: (res) => {

 const idParaFoto = this.isEdicao ? this.tutorId! : res.id;

if (this.selectedFile) {
  this.tutorService.uploadFoto(idParaFoto, this.selectedFile).subscribe({
    next: (tutorAtualizado) => {   
      this.tutorForm.patchValue({ foto: tutorAtualizado.foto });
      alert('Foto enviada com sucesso!');
      this.finalizar(idParaFoto);
    },
    error: (err) => alert('Erro no upload da foto.')
  });
} else {
    alert('Tutor salvo com sucesso!');
    this.finalizar(idParaFoto);
  }
}
  });
}

  private verificarFotoOuSucesso(id: number) {
    if (this.selectedFile) {
      this.tutorService.uploadFoto(id, this.selectedFile).subscribe({
        next: () => this.finalizar(id),
        error: () => {
          alert('Dados salvos, mas houve erro na foto.');
          this.finalizar(id);
        }
      });
    } else {
      this.finalizar(id);
    }
  }

  private finalizar(id: number) {
    this.loading = false;
    if (this.isEdicao) {
      this.router.navigate(['/tutores']);
    } else {   
      this.router.navigate(['/pets/novo'], { queryParams: { tutorId: id } });
    }
  }

  voltar() {
    this.location.back();
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

mascaraTelefone(event: any) {
  const valorInput = event?.target?.value;
  if (valorInput === null || valorInput === undefined) return;
 
  let valor = String(valorInput).replace(/\D/g, ""); 
  
  if (!valor) return; 

  valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
  valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
  this.tutorForm.patchValue({ telefone: valor }, { emitEvent: false });
}

mascaraCPF(event: any) {
  const valorInput = event?.target?.value;
  if (valorInput === null || valorInput === undefined) return;

  let valor = String(valorInput).replace(/\D/g, ""); 
  
  if (!valor) return; 

  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  this.tutorForm.patchValue({ cpf: valor }, { emitEvent: false });
}

private formatarCamposIniciais() {
  const tel = this.tutorForm.get('telefone')?.value;
  const cpf = this.tutorForm.get('cpf')?.value;

  if (tel) {
    this.mascaraTelefone({ target: { value: tel } });
  }
  if (cpf) {
    this.mascaraCPF({ target: { value: cpf } });
  }
}
vincularNovoPet(petId: number) {
  this.tutorService.vincularPet(this.tutorId!, petId).subscribe({
    next: () => {
      alert('Pet vinculado com sucesso!');
      this.carregarDadosParaEdicao(this.tutorId!); // Recarrega a lista
    },
    error: (err) => console.error('Erro ao vincular:', err)
  });
}

removerPet(petId: number) {
  if (confirm('Deseja realmente remover o vínculo deste pet?')) {
    this.tutorService.removerVinculoPet(this.tutorId!, petId).subscribe({
      next: () => {
        // Remove da lista local para atualizar a interface rápido
        this.petsVinculados = this.petsVinculados.filter(p => p.id !== petId);
        alert('Vínculo removido!');
      },
      error: (err) => alert('Erro ao remover vínculo.')
    });
  }
}
irParaNovoPet() {
  if (this.tutorId) {

    this.router.navigate(['/pets/novo'], { 
      queryParams: { tutorId: this.tutorId } 
    });
  } else {
    alert('Erro: ID do tutor não encontrado para vinculação.');
  }
}
}