import { Divider, Typography } from "antd";
import ListPresentesNome from "components/ListPresentesNome";
import React from "react";
import tipoEntregaLabel from "utils/tipoEntregaLabel";
require("./ConfirmFeedback.less");

interface Props {
  presente: Models.Presente;
  nome: string;
  tipoPresente: Models.TipoPresente;
}
const ConfirmFeedback: React.FC<Props> = ({ presente, nome, tipoPresente }) => {
  return (
    <div className="confirmacao">
      <Typography.Title level={3}>{nome}</Typography.Title>
      {presente.tipoEntrega && (
        <Typography.Text>
          Você escolheu {tipoEntregaLabel[presente.tipoEntrega]}
        </Typography.Text>
      )}
      <div className="recomendacoes">
        <p>
          {presente.tipoEntrega === "enviar_domicilio"
            ? "Rua 404, nº 101. Condomínio Recanto Praças 2, Casa 46, Negrão de Lima. Goiânia, Goiás. 74.650-360"
            : "Te vemos dia 13 de agosto no chá de panela!"}
        </p>
      </div>

      {tipoPresente === "presente" && (
        <>
          <Divider />
          <Typography.Text>
            Seus presentes, tire um print dessa tela 😉📲
          </Typography.Text>
        </>
      )}
      <ListPresentesNome itens={presente.presentes} />
      <Divider />
      <Typography.Title level={3}>
        Finalize abaixo o registro e aguarde a confirmação do casal
      </Typography.Title>
    </div>
  );
};

export default ConfirmFeedback;
