import { Button } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
require("./Home.less");

const Home: NextPage = () => {
  const [username, setUsername] = useState("");

  const router = useRouter();

  return (
    <div className="container">
      <Head>
        <title>Casamento nana e gui</title>
        <meta
          name="casamento"
          content="Lista de itens para casamento da nana e do gui"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <div className="formContain">
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/presentes-disponiveis/${username}`);
            }}
          >
            <label className="label">
              <input
                className="input"
                type="text"
                placeholder="Seu nome :)"
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <Button
              disabled={username.length === 0}
              className="button"
              htmlType="submit"
            >
              Ver presentes disponíveis
            </Button>
          </form>
        </div>
        <div className="sliderContain">
          <div className="slider">
            <div className="feature"></div>
            <div className="overlay"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
