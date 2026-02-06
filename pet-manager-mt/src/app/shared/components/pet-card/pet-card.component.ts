import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pet } from '../../../core/models/pet.model'; 
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.scss']
})
export class PetCardComponent {
  @Input() pet!: Pet;
  @Output() clickDetalhes = new EventEmitter<number>();
<<<<<<< HEAD
  @Output() clickExcluir = new EventEmitter<Pet>(); 
=======
>>>>>>> deb8838b68351c5a7ca028964bc7cd557a5cc154

  verDetalhes() {
    if (this.pet.id) {
      this.clickDetalhes.emit(this.pet.id);
    }
  }

  onExcluir() {
    this.clickExcluir.emit(this.pet);
  }
}