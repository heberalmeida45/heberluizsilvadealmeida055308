import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'pets', 
    loadChildren: () => import('./features/pets/pets-module').then(m => m.PetsModule) 
  },
  { path: '', redirectTo: 'pets', pathMatch: 'full' }
];
