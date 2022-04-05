import Head from "next/head";
import React from "react";
require("./PageContainer.less");

interface Props {
  children: React.ReactNode;
  pageTitle: string;
  metaContent: string;
}
const PageContainer: React.FC<Props> = ({
  children,
  pageTitle,
  metaContent,
}) => {
  return (
    <div className="container">
      <Head>
        <title>{pageTitle}</title>
        <meta name={pageTitle} content={metaContent} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
      <footer className="credits">
        <a target="_blank" href="https://weverton.me">
          dev by wev
        </a>
      </footer>
    </div>
  );
};

export default PageContainer;
