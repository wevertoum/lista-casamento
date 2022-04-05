import { Result } from "antd";
import React from "react";

interface Props {}
const Page404: React.FC<Props> = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Result status="404" title="404" subTitle="Página nao encontrada." />
    </div>
  );
};

export default Page404;
