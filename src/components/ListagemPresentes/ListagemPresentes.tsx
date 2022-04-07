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
        {opcoesLista.map((presente, i) => (
          <Col
            style={{ display: "flex", justifyContent: "center" }}
            span={span}
            key={i}
          >
            <Checkbox
              disabled={presente.status === "reservado"}
              key={presente.id}
              checked={selectedPresentes?.some((p) => p.id === presente.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange([...(selectedPresentes || []), presente]);
                } else {
                  onChange(
                    selectedPresentes?.filter((p) => p.id !== presente.id)
                  );
                }
              }}
            >
              <Badge.Ribbon
                color="#cecece"
                text="Reservado"
                style={{
                  display: presente.status === "reservado" ? "block" : "none",
                }}
              >
                <ItemPresente
                  presente={presente}
                  selected={selectedPresentes?.some(
                    (p) => p.id === presente.id
                  )}
                  disabled={presente.status === "reservado"}
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
