import { mdiGiftOutline, mdiOpenInNew } from "@mdi/js";
import { Badge, Button, Checkbox, Col, Row } from "antd";
import MaterialIcon from "components/MaterialIcon";
import useWindowSize from "hooks/useWindowSize";
import React, { useMemo } from "react";
import openLinkExterno from "utils/openLinkExterno";
require("./InfosDoPedido.less");

interface Props {
  selectedPresentes: Models.Presente[];
}
const InfosDoPedido: React.FC<Props> = ({ selectedPresentes }) => {
  const [width] = useWindowSize();

  return (
    <div className="infos-content">
      <div className="presentes-escolhidos">
        <Row style={{ marginLeft: 0, marginRight: 0 }} gutter={[16, 16]}>
          {selectedPresentes.map((presente, i) => (
            <p>{presente.nome}</p>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default InfosDoPedido;
