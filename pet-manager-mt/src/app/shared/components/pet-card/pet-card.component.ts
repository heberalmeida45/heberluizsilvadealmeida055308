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

  verDetalhes() {
    if (this.pet.id) {
      this.clickDetalhes.emit(this.pet.id);
    }
  }
}