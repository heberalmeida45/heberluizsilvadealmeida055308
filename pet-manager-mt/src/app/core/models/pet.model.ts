export interface Foto {
  id: number;
  nome: string;
  contentType: string;
  url: string;
}

export interface Tutor {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cpf: number;
  foto?: Foto; 
}

export interface Pet {
  id: number;
  nome: string;
<<<<<<< HEAD
  especie?: string;
  raca: string;
  idade: number;
  foto?: {
    id: number;
    nome: string;
    contentType: string;
    url: string;
  };
  tutores: Tutor[];
=======
  raca: string;
  idade: number;
  especie?: string; 
  foto?: Foto;      
  tutores: Tutor[]; 
>>>>>>> deb8838b68351c5a7ca028964bc7cd557a5cc154
}


export interface AuthResponse {
  token: string;
  refreshToken: string;
}