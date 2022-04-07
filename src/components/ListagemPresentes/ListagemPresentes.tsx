import { Badge, Checkbox, Col, Row } from "antd";
import ItemPresente from "components/ItemPresente";
import useWindowSize from "hooks/useWindowSize";
import React, { useMemo } from "react";
require("./ListagemPresentes.less");

interface Props {
  opcoesLista: Models.Item[];
  onChange: (presentes: Models.Item[]) => void;
  selectedPresentes: Models.Item[];
}
const ListagemPresentes: React.FC<Props> = ({
  opcoesLista,
  onChange,
  selectedPresentes = [],
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

  return (
    <div className="list-content">
      <Row style={{ marginLeft: 0, marginRight: 0 }} gutter={[16, 16]}>
        {opcoesLista.map((item, i) => (
          <Col
            style={{ display: "flex", justifyContent: "center" }}
            span={span}
            key={i}
          >
            <Checkbox
              disabled={item.status === "reservado"}
              key={item.id}
              checked={selectedPresentes?.some((p) => p.id === item.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange([...(selectedPresentes || []), item]);
                } else {
                  onChange(
                    selectedPresentes?.filter((p) => p.id !== item.id)
                  );
                }
              }}
            >
              <Badge.Ribbon
                color="#cecece"
                text="Reservado"
                style={{
                  display: item.status === "reservado" ? "block" : "none",
                }}
              >
                <ItemPresente
                  item={item}
                  selected={selectedPresentes?.some(
                    (p) => p.id === item.id
                  )}
                  disabled={item.status === "reservado"}
                />
              </Badge.Ribbon>
            </Checkbox>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ListagemPresentes;
