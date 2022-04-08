/// <reference types="react-scripts" />

namespace Models {
  interface Presente {
    presentes: Models.Item[];
    mensagem: string;
    urlFoto: string;
    nome: string;
    tipoEntrega: Models.TipoEntrega;
  }

  type TipoEntrega = "levar_no_dia" | "enviar_domicilio";
}
