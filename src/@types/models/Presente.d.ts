/// <reference types="react-scripts" />

namespace Models {
  interface Presente {
    presentes: Models.Item[];
    timestamp: any;
    mensagem: string;
    tipo: Models.TipoPresente;
    urlFoto: string;
    nome: string;
    tipoEntrega: Models.TipoEntrega;
  }

  type TipoEntrega = "levar_no_dia" | "enviar_domicilio";
  type TipoPresente = "presente" | "pix";
}
