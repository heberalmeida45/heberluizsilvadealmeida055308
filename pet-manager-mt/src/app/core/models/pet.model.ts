export interface Pet {
  id?: string;
  nome: string;
  especie: string;
  idade: number;
  raca: string;
  fotoUrl?: string;
  tutorId?: string;
}

export interface Tutor {
  id?: string;
  nomeCompleto: string;
  telefone: string;
  endereco: string;
  fotoUrl?: string;
  pets?: Pet[];
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
}