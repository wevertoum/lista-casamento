/// <reference types="react-scripts" />

namespace Models {
  interface Presente {
    presentes: Models.Item[];
    mensagem: string;
    tipoEntrega: Models.TipoEntrega;
  }

  type TipoEntrega = "levar_no_dia" | "enviar_domicilio";
}
