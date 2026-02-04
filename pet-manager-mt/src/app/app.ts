import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { PetFacade } from './facades/pet.facade';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  
  constructor(private authService: AuthService, private petFacade: PetFacade) {}

ngOnInit() {
    this.authService.login('admin', 'admin').subscribe({
    next: (res) => {
      console.log('Login automático OK!');
      // SÓ AGORA chamamos os pets
      this.petFacade.loadPets(); 
    },
    error: (err) => {
      console.error('O erro 404 aconteceu aqui! Verifique a URL do login no AuthService.', err);
    }
  });
  }
}