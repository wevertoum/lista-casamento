import { Badge, Checkbox, Col, Row } from "antd";
import ItemPresente from "components/ItemPresente";
import useWindowSize from "hooks/useWindowSize";
import React, { useMemo } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "utils/firebaseConfig";
require("./ListagemPresentes.less");

interface Props {
  opcoesLista: Models.Item[];
  onChange: (presentes: Models.Item[]) => void;
  selectedPresentes: Models.Item[];
  nome: string;
}
const ListagemPresentes: React.FC<Props> = ({
  opcoesLista,
  onChange,
  selectedPresentes = [],
  nome,
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

  const changeStatus = (
    idItem: string,
    status?: boolean,
    reservadoPor?: string
  ) => {
    const collectionById = doc(database, "itens", idItem);
    if (status) {
      updateDoc(collectionById, {
        status: "reservado",
        reservadoPor,
      });
    } else {
      updateDoc(collectionById, {
        status: "disponivel",
        reservadoPor: null,
      });
    }
  };

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
              disabled={
                item.status === "reservado" && item.reservadoPor !== nome
              }
              key={item.id}
              checked={
                selectedPresentes?.some((p) => p.id === item.id) ||
                item.status === "reservado"
              }
              onChange={(e) => {
                changeStatus(item.id, e.target.checked, nome);
                if (e.target.checked) {
                  onChange([...(selectedPresentes || []), item]);
                } else {
                  onChange(selectedPresentes?.filter((p) => p.id !== item.id));
                }
              }}
            >
              <Badge.Ribbon
                color="#cecece"
                text="Reservado"
                style={{
                  display:
                    item.status === "reservado" && item.reservadoPor !== nome
                      ? "block"
                      : "none",
                }}
              >
                <ItemPresente
                  item={item}
                  selected={selectedPresentes?.some((p) => p.id === item.id)}
                  disabled={
                    item.status === "reservado" && item.reservadoPor !== nome
                  }
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
