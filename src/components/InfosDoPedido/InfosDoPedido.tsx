import { Alert, Col, Divider, Input, Radio, Row, Typography } from "antd";
import ItemPresente from "components/ItemPresente";
import useWindowSize from "hooks/useWindowSize";
import React, { useMemo, useState } from "react";
import { debounce } from "lodash";
require("./InfosDoPedido.less");

interface Props {
  onSelectTipoEntrega: (tipoEntrega: Models.TipoEntrega) => void;
  onWriteMessage: (message: string) => void;
  pedido: Models.Pedido;
}
const InfosDoPedido: React.FC<Props> = ({
  onSelectTipoEntrega,
  onWriteMessage,
  pedido,
}) => {
  const [width] = useWindowSize();

  const span = useMemo(() => {
    if (width > 1800) {
      return 6;
    }
    if (width > 1260 && width < 1800) {
      return 8;
    }
    if (width > 800 && width < 1260) {
      return 12;
    }
    if (width < 800) {
      return 24;
    }
  }, [width]);

  const [tipoEntrega, setTipoEntrega] = useState<Models.TipoEntrega>();

  const onMessageThrottled = debounce(onWriteMessage, 1000);

  const alertContent = useMemo(() => {
    if (tipoEntrega === "levar_no_dia") {
      return {
        message: "Você escolheu entregar no dia",
        description: "Nos vemos por la!",
        type: "success",
        showIcon: true,
      };
    } else if (tipoEntrega === "enviar_domicilio") {
      return {
        message: "Você escolheu enviar para domicílio",
        description: (
          <>
            <Typography.Title level={5}>
              Fique atento ao endereço de entrega
            </Typography.Title>
            <Typography.Paragraph>
              Rua 404, 100, condomínio recanto praças 2, casa 46, negrao de lima
              74650360
            </Typography.Paragraph>
          </>
        ),
        type: "info",
        showIcon: true,
      };
    }
  }, [tipoEntrega]);

  return (
    <>
      <div className="infos-description">
        <Typography.Title level={4}>
          Presentes selecionados por você ✅
        </Typography.Title>
        <Divider />
      </div>
      <div className="infos-content">
        <Row
          style={{ marginLeft: 0, marginRight: 0, width: "100%" }}
          gutter={[16, 16]}
        >
          {(pedido.presentes || []).map((presente, i) => (
            <Col
              style={{ display: "flex", justifyContent: "center" }}
              span={span}
              key={i}
            >
              <ItemPresente presente={presente} />
            </Col>
          ))}
        </Row>
      </div>
      <Divider />
      <div className="infos-description-entrega">
        <Typography.Title level={4}>
          Informações sobre entrega 🤔
        </Typography.Title>
      </div>
      <Radio.Group
        onChange={(e) => {
          onSelectTipoEntrega(e.target.value);
          setTipoEntrega(e.target.value);
        }}
        value={pedido.tipoEntrega}
      >
        <Radio value={"levar_no_dia"}>Levar no dia</Radio>
        <Radio value={"enviar_domicilio"}>Entregar Domicílio</Radio>
      </Radio.Group>

      {tipoEntrega && (
        <Alert
          message={alertContent?.message}
          description={alertContent?.description}
          type={alertContent?.type as any}
          showIcon
        />
      )}
      <Divider />
      <div className="infos-mensagem">
        <Typography.Title level={4}>
          Deixe uma mensagem para o feed! 💅🏽
        </Typography.Title>
      </div>

      <Input.TextArea
        rows={4}
        placeholder="Escreva uma mensagem para o presenteado"
        onChange={(e) => onMessageThrottled(e.target.value)}
      />
    </>
  );
};

export default InfosDoPedido;
