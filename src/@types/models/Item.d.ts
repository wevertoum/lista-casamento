/// <reference types="react-scripts" />

namespace Models {
  interface Item {
    status: Models.ItemStatus;
    reservadoPor?: string;
    id: string;
    nome: string;
    url?: string;
    qtd: number;
  }

  type ItemStatus = "disponivel" | "reservado" | "indisponivel";
}
