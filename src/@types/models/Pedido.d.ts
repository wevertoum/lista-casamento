/// <reference types="react-scripts" />

namespace Models {
  interface Pedido {
    presentes: Models.Presente[];
    mensagem: string;
    tipoEntrega: Models.TipoEntrega;
  }

  type TipoEntrega = "levar_no_dia" | "enviar_domicilio";
}
