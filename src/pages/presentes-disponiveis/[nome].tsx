import { mdiArrowLeftCircle, mdiArrowRightCircle, mdiCheckAll } from "@mdi/js";
import { Typography, Steps, Button, message } from "antd";
import ConfirmFeedback from "components/ConfirmFeedback";
import InfosDoPresente from "components/InfosDoPresente";
import ListagemPresentes from "components/ListagemPresentes";
import MaterialIcon from "components/MaterialIcon";
import PageContainer from "components/PageContainer/PageContainer";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { database } from "utils/firebaseConfig";
require("./PresentesDisponiveis.less");
import { collection, onSnapshot } from "firebase/firestore";

const { Step } = Steps;

interface Props {}
const PresentesDisponiveis: React.FC<Props> = () => {
  const router = useRouter();
  const { nome } = router.query;
  const [presente, setPresente] = useState<Models.Presente>(
    {} as Models.Presente
  );
  const [opcoesLista, setOpcoesLista] = useState<Models.Item[]>(
    [] as Models.Item[]
  );
  const [current, setCurrent] = React.useState(0);
  const dbInstance = collection(database, "itens");

  onSnapshot(dbInstance, (snapshot) => {
    let itens = snapshot.docs.map((doc) => doc.data());
    setOpcoesLista(itens as Models.Item[]);
  });

  const steps = [
    {
      title: "🧐",
      content: ListagemPresentes({
        opcoesLista,
        onChange: (presentes) => {
          setPresente({ ...presente, presentes });
        },
        selectedPresentes: presente.presentes,
      }),
    },
    {
      title: "📋",
      content: InfosDoPresente({
        presente,
        onSelectTipoEntrega: (tipoEntrega) => {
          setPresente({ ...presente, tipoEntrega });
        },
        onWriteMessage: (mensagem) => {
          setPresente({ ...presente, mensagem });
        },
      }),
    },
    {
      title: "✅",
      content: ConfirmFeedback({
        presente,
        nome: nome as string,
      }),
    },
  ];

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
                onClick={() => {
                  console.log({
                    ...presente,
                    nome: nome as string,
                  });
                  message.success("Salvando seu presente!");
                }}
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
