import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TutorService } from '../../core/services/tutor.service';

@Component({
  selector: 'app-tutor-list',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: 'tutor-list.component.html'
})
export class TutorListComponent implements OnInit {
  
  currentPage = 0;
  tutores: any[] = [];
  loading = false;

  constructor(private tutorService: TutorService) {}

  ngOnInit(): void {
    this.carregarTutores();
  }

carregarTutores() {
  this.loading = true;
  this.tutorService.listarTutores(this.currentPage).subscribe({
    next: (resposta) => {
      const novosDados = resposta.content || [];
      
    
      if (novosDados.length === 0 && this.currentPage > 0) {
        alert('Fim da lista: Não existem mais tutores cadastrados.');
        this.currentPage--; 
        this.loading = false;
        return; 
      }

      this.tutores = novosDados;
      this.loading = false;
    },
    error: (err) => {
      this.loading = false;
      console.error('Erro ao conectar com o servidor:', err);
    }
  });
}

  mudarPagina(proxima: boolean) {
  if (this.loading) return; 

  const paginaOriginal = this.currentPage; 

  if (proxima) {
    this.currentPage++;
  } else if (this.currentPage > 0) {
    this.currentPage--;
  }

  this.loading = true;
  this.tutorService.listarTutores(this.currentPage).subscribe({
   next: (resposta) => {
  // O LOG É SEU MELHOR AMIGO AGORA:
  console.log('O que a GEIA mandou:', resposta);

  // Verificamos se a lista está no .content ou se a resposta JÁ É a lista
  const listaVindaDaApi = resposta.content ? resposta.content : resposta;

  if (Array.isArray(listaVindaDaApi)) {
    this.tutores = listaVindaDaApi;
  } else {
    this.tutores = [];
  }

  this.loading = false; // Isso para o loop do spinner
},
    error: (err) => {
      this.loading = false;
      this.currentPage = paginaOriginal; 
      console.error('Erro na API:', err);
    }
  });
}

  excluir(tutor: any) {
    if (confirm(`Deseja excluir o tutor ${tutor.nome}?`)) {
      this.tutorService.excluir(tutor.id).subscribe({
        next: () => {
          alert('Tutor excluído!');
          this.carregarTutores();
        },
        error: () => alert('Erro: Verifique se este tutor possui pets vinculados.')
      });
    }
  }
}