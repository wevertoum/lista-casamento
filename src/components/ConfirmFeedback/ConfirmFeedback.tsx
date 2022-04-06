import { Divider, Typography } from "antd";
import React from "react";
import tipoEntregaLabel from "utils/tipoEntregaLabel";
require("./ConfirmFeedback.less");

interface Props {
  pedido: Models.Pedido;
  nome: string;
}
const ConfirmFeedback: React.FC<Props> = ({ pedido, nome }) => {
  return (
    <>
      <Typography.Title level={3}>{nome}</Typography.Title>
      <Typography.Text>
        Você escolheu {tipoEntregaLabel[pedido.tipoEntrega]}
      </Typography.Text>
      <div className="recomendacoes">
        <p>
          {pedido.tipoEntrega === "enviar_domicilio"
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
