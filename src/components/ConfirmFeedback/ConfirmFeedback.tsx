import { Divider, Typography } from "antd";
import React from "react";
import tipoEntregaLabel from "utils/tipoEntregaLabel";
require("./ConfirmFeedback.less");

interface Props {
  presente: Models.Presente;
  nome: string;
}
const ConfirmFeedback: React.FC<Props> = ({ presente, nome }) => {
  return (
    <>
      <Typography.Title level={3}>{nome}</Typography.Title>
      <Typography.Text>
        Você escolheu {tipoEntregaLabel[presente.tipoEntrega]}
      </Typography.Text>
      <div className="recomendacoes">
        <p>
          {presente.tipoEntrega === "enviar_domicilio"
            ? "Rua 404, 100, condomínio recanto praças 2, casa 46, negrao de lima 74650360"
            : "Te vejo no dia do casamento!"}
        </p>
      </div>
      <Divider />
      <Typography.Title level={3}>
        Finalize abaixo o registro e aguarde a confirmação do casal
      </Typography.Title>
    </>
  );
};

export default ConfirmFeedback;
