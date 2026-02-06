import { Routes } from '@angular/router';
import { PetListComponent } from './features/pets/pages/pet-list/pet-list.component';
import { PetDetailComponent } from './features/pets/pages/pet-detail/pet-detail.component';
import { PetFormComponent } from './features/pets/pages/pet-form/pet-form';
import { TutorFormComponent } from './features/tutor/tutor-form/tutor-form';
import { TutorListComponent } from './features/tutor/tutor-list.component';

export const routes: Routes = [
  // Rotas de Pets
  { path: 'pets', component: PetListComponent },
  { path: 'pets/novo', component: PetFormComponent },
  { path: 'pets/:id', component: PetDetailComponent },
  { path: 'pets/editar/:id', component: PetFormComponent },

  // Rotas de Tutores
  { path: 'tutores', component: TutorListComponent },
  { path: 'tutores/novo', component: TutorFormComponent },
  { path: 'tutores/editar/:id', component: TutorFormComponent },

  // Rota padrão (Redireciona para a lista de tutores ao abrir o app)
  { path: '', redirectTo: '/tutores', pathMatch: 'full' }
];