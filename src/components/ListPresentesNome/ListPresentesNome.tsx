import { mdiCash, mdiGift } from "@mdi/js";
import { Typography } from "antd";
import MaterialIcon from "components/MaterialIcon";
import React from "react";
require("./ListPresentesNome.less");

interface Props {
  itens: Models.Item[];
  tipo: Models.TipoPresente;
}
const ListPresentesNome: React.FC<Props> = ({ itens, tipo }) => {
  return (
    <>
      {tipo === "presente" ? (
        <div className="lista-presentes-escolhidos">
          {(itens || []).map((presente, index) => (
            <div key={index} className="presente-item">
              <div className="icon">
                <MaterialIcon size={1.3} path={mdiGift} color="#a87008b0" />
              </div>
              <div className="descricao">
                <Typography.Text strong>{presente.nome}</Typography.Text>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="lista-presentes-escolhidos">
          <div className="presente-item">
            <div className="icon">
              <MaterialIcon size={1.3} path={mdiCash} color="#a87008b0" />
            </div>
            <div className="descricao">
              <Typography.Text strong>Contribuiu com pix</Typography.Text>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListPresentesNome;
