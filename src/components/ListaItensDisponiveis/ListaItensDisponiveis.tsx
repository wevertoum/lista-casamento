import { mdiGiftOutline, mdiOpenInNew } from "@mdi/js";
import { Button, Checkbox, Col, Row } from "antd";
import MaterialIcon from "components/MaterialIcon";
import useWindowSize from "hooks/useWindowSize";
import React, { useMemo } from "react";
import openLinkExterno from "utils/openLinkExterno";
require("./ListaItensDisponiveis.less");

interface Props {
  opcoesLista: Models.Presente[];
  onChange: (presentes: Models.Presente[]) => void;
  selectedPresentes: Models.Presente[];
}
const ListaItensDisponiveis: React.FC<Props> = ({
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
              <div
                className={`item-presente ${
                  selectedPresentes?.some((p) => p.id === presente.id)
                    ? "selected"
                    : ""
                }`}
              >
                <div className="icon">
                  <MaterialIcon
                    path={mdiGiftOutline}
                    size={1.8}
                    color="#ffa600b0"
                  />
                </div>

                <div className="descricao-container">
                  <small>{presente.nome}</small>
                  <Button
                    icon={
                      <MaterialIcon
                        path={mdiOpenInNew}
                        size={0.7}
                        color="#0099ffaf"
                      />
                    }
                    style={{
                      color: "#0099ffaf",
                    }}
                    shape="round"
                    type="text"
                    size="small"
                    onClick={() => openLinkExterno(presente.url)}
                  >
                    Inspiração
                  </Button>
                </div>
              </div>
            </Checkbox>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ListaItensDisponiveis;
