import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pet } from '../../../core/models/pet.model'; 

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.scss']
})
export class PetCardComponent {
  @Input() pet!: Pet;
  @Output() clickDetalhes = new EventEmitter<string>();

  verDetalhes() {
    if (this.pet.id) {
      this.clickDetalhes.emit(this.pet.id);
    }
  }
}