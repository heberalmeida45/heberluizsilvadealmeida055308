import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetDetailComponent } from './pages/pet-detail/pet-detail.component';
import { PetListComponent } from './pages/pet-list/pet-list.component';


const routes: Routes = [
  { path: '', component: PetListComponent },
  { path: ':id', component: PetDetailComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsRoutingModule { }