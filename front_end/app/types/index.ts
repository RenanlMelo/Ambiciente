export interface Topic {
  id: number;
  title: string;
  content: string;
}

export interface Article {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
  topics: Topic[];
}

export interface Report {
  status: string;
  descricao_ocorrido: string;
  local_ocorrido: string;
  data_ocorrido: string;
  impactos_ocorrido: string;
  responsavel: string;
  is_anonimo: boolean;
  nome: string;
  sobrenome: string;
  telefone: string;
  id: number;
  email: string;
  data_criacao: string;
  id_usuario: number;
}

export interface User {
  id: number;
  name: string;
  last_name: string;
  email: string;
  role: string;
}
