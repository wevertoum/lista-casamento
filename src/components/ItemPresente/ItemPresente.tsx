import { mdiGiftOutline, mdiOpenInNew } from "@mdi/js";
import { Button } from "antd";
import MaterialIcon from "components/MaterialIcon";
import React from "react";
import openLinkExterno from "utils/openLinkExterno";
require("./ItemPresente.less");

interface Props {
  selected?: boolean;
  disabled?: boolean;
  item: Models.Item;
}
const ItemPresente: React.FC<Props> = ({
  selected = false,
  disabled,
  item,
}) => {
  return (
    <div
      className={`item-lista ${selected ? "selected" : ""} ${
        disabled ? "disabled" : ""
      }`}
    >
      <div className="icon">
        <MaterialIcon path={mdiGiftOutline} size={1.8} color="#a87008b0" />
      </div>

      <div className="descricao-container">
        <small>{item?.nome}</small>

        {item && item.url && (
          <Button
            disabled={item.status === "reservado"}
            icon={
              <MaterialIcon path={mdiOpenInNew} size={0.7} color="#314528af" />
            }
            style={{
              color: "#314528af",
            }}
            shape="round"
            type="text"
            size="small"
            onClick={() => openLinkExterno(item.url!)}
          >
            Inspiração
          </Button>
        )}
      </div>
    </div>
  );
};

export default ItemPresente;
