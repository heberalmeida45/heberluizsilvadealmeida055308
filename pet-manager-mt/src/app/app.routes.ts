import { Routes } from '@angular/router';
import { PetListComponent } from './features/pets/pages/pet-list/pet-list.component';
import { PetDetailComponent } from './features/pets/pages/pet-detail/pet-detail.component';
import { PetFormComponent } from './features/pets/pages/pet-form/pet-form';
import { TutorFormComponent } from './features/tutor/tutor-form/tutor-form';
<<<<<<< HEAD
import { TutorListComponent } from './features/tutor/tutor-list.component';
=======
>>>>>>> deb8838b68351c5a7ca028964bc7cd557a5cc154

export const routes: Routes = [
  { path: 'pets', component: PetListComponent },
  { path: 'pets/novo', component: PetFormComponent },
{ path: 'pets/:id', component: PetDetailComponent },
<<<<<<< HEAD
{ path: 'tutores', component: TutorListComponent },
{ path: 'tutores/novo', component: TutorFormComponent },
{ path: 'tutores/editar/:id', component: TutorFormComponent },
{ path: 'pets/editar/:id', component: PetFormComponent }
=======
{ path: 'tutores/novo', component: TutorFormComponent }
>>>>>>> deb8838b68351c5a7ca028964bc7cd557a5cc154
];
