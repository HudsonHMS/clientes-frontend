import { Servico } from "./servico";

export interface Cliente {
  id?: number;
  nome: string;
  cpf: string;
  status_id?: number;
  status_nome: string;
  servicos?: Servico[]
}
