/// <reference types="react-scripts" />

namespace Models {
  interface Item {
    status: "disponivel" | "reservado" | "indisponivel";
    id: string;
    nome: string;
    url?: string;
    qtd: number;
  }
}
