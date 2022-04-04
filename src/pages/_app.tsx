import "styles/globals.css";
import "antd/dist/antd.css";
require("../styles/globals.less");
import type { AppProps } from "next/app";
import React from "react";
import ptBR from "antd/lib/locale/pt_BR";
import { ConfigProvider } from "antd";
import "moment/locale/pt-br";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider locale={ptBR}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
export default MyApp;
