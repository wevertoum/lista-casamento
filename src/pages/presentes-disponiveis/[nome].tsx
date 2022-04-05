import { mdiArrowLeftCircle, mdiArrowRightCircle, mdiCheckAll } from "@mdi/js";
import { Typography, Steps, Button, message } from "antd";
import InfosDoPedido from "components/InfosDoPedido";
import ListaItensDisponiveis from "components/ListaItensDisponiveis";
import MaterialIcon from "components/MaterialIcon";
import PageContainer from "components/PageContainer/PageContainer";
import { useRouter } from "next/router";
import React, { useState } from "react";
import opcoesLista from "utils/opcoesLista";
require("./PresentesDisponiveis.less");

const { Step } = Steps;

interface Props {}
const PresentesDisponiveis: React.FC<Props> = () => {
  const router = useRouter();
  const { nome } = router.query;
  const [selectedPresentes, setSelectedPresentes] = useState(
    [] as Models.Presente[]
  );

  const steps = [
    {
      title: "Opcões 🧐",
      content: ListaItensDisponiveis({
        opcoesLista,
        setSelectedPresentes,
        selectedPresentes,
      }),
    },
    {
      title: "Infos 📋",
      content: InfosDoPedido({ selectedPresentes }),
    },
    {
      title: "Check ✅",
      content: "Last-content",
    },
  ];

  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <PageContainer pageTitle={"Presentes disponíveis"}>
      <div className="presentes-disponiveis">
        <div className="title-header">
          <Typography.Title level={2}>
            {nome}, escolha seus presentes 🎁
          </Typography.Title>
        </div>

        <div className="progress">
          <Steps current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
        </div>

        <div className="presentes-content">
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action">
            <Button
              shape="round"
              disabled={current === 0}
              icon={<MaterialIcon path={mdiArrowLeftCircle} />}
              onClick={() => prev()}
            >
              Voltar
            </Button>

            {current < steps.length - 1 && (
              <Button
                shape="round"
                disabled={current === steps.length - 1}
                icon={<MaterialIcon path={mdiArrowRightCircle} />}
                type="primary"
                onClick={() => next()}
              >
                Avançar
              </Button>
            )}

            {current === steps.length - 1 && (
              <Button
                shape="round"
                disabled={current === steps.length}
                icon={<MaterialIcon path={mdiCheckAll} />}
                type="primary"
                onClick={() => message.success("Salvando seus presentes!")}
              >
                Finalizar
              </Button>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default PresentesDisponiveis;
