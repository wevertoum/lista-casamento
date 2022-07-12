import Head from "next/head";
import React from "react";
require("./PageContainer.less");

interface Props {
  children: React.ReactNode;
  pageTitle: string;
  showCredits?: boolean;
}
const PageContainer: React.FC<Props> = ({
  children,
  pageTitle,
  showCredits = false,
}) => {
  return (
    <div className="container">
      <Head>
        <title>{pageTitle}</title>
        <meta name={pageTitle} content="Casamento da nana e do gui" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {children}
      {showCredits && (
        <footer className="credits">
          <a target="_blank" href="https://weverton.me" rel="noreferrer">
            👨🏾‍💻 by wev
          </a>
        </footer>
      )}
    </div>
  );
};

export default PageContainer;
