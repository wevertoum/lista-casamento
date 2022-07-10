import { Typography } from "antd";
import React from "react";
import MaterialIcon from "components/MaterialIcon";
import { mdiCash, mdiGiftOutline } from "@mdi/js";
require("./ChoiceTipoPresente.less");

interface Props {
  onSelect: (tipo: Models.TipoPresente) => void;
  tipoPresente?: Models.TipoPresente;
}
const ChoiceTipoPresente: React.FC<Props> = ({
  onSelect,
  tipoPresente = "",
}) => {
  const opcoesLista = [
    {
      title: "Escolher presente",
      key: "presente",
      icon: mdiGiftOutline,
    },
    {
      title: "Contribuir com PIX",
      key: "pix",
      icon: mdiCash,
    },
  ];

  return (
    <div className="list-content-choice">
      {opcoesLista.map((item, i) => (
        <div
          key={i}
          className={`choice-item ${
            tipoPresente === item.key ? "selected" : ""
          }`}
          onClick={() => onSelect(item.key as Models.TipoPresente)}
        >
          <MaterialIcon color="#a87008b0" size={5} path={item.icon} />
          <Typography.Title
            style={{ marginLeft: 16, marginBottom: 0 }}
            level={4}
          >
            {item.title}
          </Typography.Title>
        </div>
      ))}
    </div>
  );
};

export default ChoiceTipoPresente;
