import { Routes } from '@angular/router';
import { PetListComponent } from './features/pets/pages/pet-list/pet-list.component';
import { PetDetailComponent } from './features/pets/pages/pet-detail/pet-detail.component';

export const routes: Routes = [
  { path: 'pets', component: PetListComponent },
{ path: 'pets/:id', component: PetDetailComponent }
];
