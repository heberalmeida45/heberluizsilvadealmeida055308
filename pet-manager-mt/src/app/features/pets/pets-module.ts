import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PetsRoutingModule } from './pets-routing-module';
import { PetListComponent } from './pages/pet-list/pet-list.component';
import { PetDetailComponent } from './pages/pet-detail/pet-detail.component';
import { PetCardComponent } from '../../shared/components/pet-card/pet-card.component';

@NgModule({
   declarations: [],  
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PetsRoutingModule,
    PetListComponent,   
    PetDetailComponent, 
    PetCardComponent    
  ]
})
export class PetsModule { }