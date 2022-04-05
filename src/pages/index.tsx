import { useCallback } from "react";
import { Button, Form, Input } from "antd";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import defaultFormRules from "utils/defaultFormRules";
import { mdiGift } from "@mdi/js";
import MaterialIcon from "components/MaterialIcon";
import PageContainer from "components/PageContainer/PageContainer";
require("./Home.less");

const Home: NextPage = () => {
  const [form] = Form.useForm();

  const router = useRouter();

  const onFinish = useCallback((values: Models.Usuario) => {
    router.push(`/presentes-disponiveis/${values.nome}`);
  }, []);

  return (
    <PageContainer
      pageTitle="Nana & Gui"
      metaContent="Casamento da nana e do gui"
    >
      <main className="main">
        <div className="form-contain">
          <Form onFinish={onFinish} layout="vertical" form={form}>
            <Form.Item
              name="nome"
              label="Olá, é um prazer te ter aqui :)"
              rules={defaultFormRules}
            >
              <Input placeholder="Digite seu nome" />
            </Form.Item>
            <Button
              shape="round"
              icon={<MaterialIcon path={mdiGift} />}
              type="primary"
              htmlType="submit"
            >
              Ver lista de presentes
            </Button>
          </Form>
        </div>
        <div className="slider-contain">
          <div className="slider">
            <div className="feature"></div>
            <div className="overlay"></div>
          </div>
        </div>
      </main>
    </PageContainer>
  );
};

export default Home;
