import { mdiGiftOutline, mdiOpenInNew } from "@mdi/js";
import { Button } from "antd";
import MaterialIcon from "components/MaterialIcon";
import React from "react";
import openLinkExterno from "utils/openLinkExterno";
require("./ItemPresente.less");

interface Props {
  selected?: boolean;
  disabled?: boolean;
  presente: Models.Item;
}
const ItemPresente: React.FC<Props> = ({
  selected = false,
  disabled,
  presente,
}) => {
  return (
    <div
      className={`item-presente ${selected ? "selected" : ""} ${
        disabled ? "disabled" : ""
      }`}
    >
      <div className="icon">
        <MaterialIcon path={mdiGiftOutline} size={1.8} color="#a87008b0" />
      </div>

      <div className="descricao-container">
        <small>{presente.nome}</small>

        <Button
          disabled={presente.status === "reservado"}
          icon={
            <MaterialIcon path={mdiOpenInNew} size={0.7} color="#314528af" />
          }
          style={{
            color: "#314528af",
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
  );
};

export default ItemPresente;
