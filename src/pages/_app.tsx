import "styles/globals.css";
import "antd/dist/antd.css";
require("../styles/globals.less");
import type { AppProps } from "next/app";
import NProgress from "nprogress";
import { Router } from "next/router";
import React from "react";
import ptBR from "antd/lib/locale/pt_BR";
import { ConfigProvider } from "antd";
import "moment/locale/pt-br";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider locale={ptBR}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
export default MyApp;
