import { Routes } from '@angular/router';
import { PetListComponent } from './features/pets/pages/pet-list/pet-list.component';
import { PetDetailComponent } from './features/pets/pages/pet-detail/pet-detail.component';
import { PetFormComponent } from './features/pets/pages/pet-form/pet-form';
import { TutorFormComponent } from './features/tutor/tutor-form/tutor-form';
import { TutorListComponent } from './features/tutor/tutor-list.component';

export const routes: Routes = [
  { path: 'pets', component: PetListComponent },
  { path: 'pets/novo', component: PetFormComponent },
{ path: 'pets/:id', component: PetDetailComponent },
{ path: 'tutores', component: TutorListComponent },
{ path: 'tutores/novo', component: TutorFormComponent },
{ path: 'tutores/editar/:id', component: TutorFormComponent },
{ path: 'pets/editar/:id', component: PetFormComponent }
];
