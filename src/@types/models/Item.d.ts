/// <reference types="react-scripts" />

namespace Models {
  interface Item {
    nome: string;
    url?: string;
    id: number;
    qtd: number;
    status: "disponivel" | "reservado" | "indisponivel";
  }
}
