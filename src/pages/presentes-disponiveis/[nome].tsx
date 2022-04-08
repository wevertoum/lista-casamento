import { mdiArrowLeftCircle, mdiArrowRightCircle, mdiCheckAll } from "@mdi/js";
import { Typography, Steps, Button, message, Modal } from "antd";
import ConfirmFeedback from "components/ConfirmFeedback";
import InfosDoPresente from "components/InfosDoPresente";
import ListagemPresentes from "components/ListagemPresentes";
import MaterialIcon from "components/MaterialIcon";
import PageContainer from "components/PageContainer/PageContainer";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
require("./PresentesDisponiveis.less");
import {
  addDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import itensColletion from "utils/network/itensColletion";
import presentesCollection from "utils/network/presentesCollection";
import { database } from "utils/firebaseConfig";

const { Step } = Steps;

interface Props {}
const PresentesDisponiveis: React.FC<Props> = () => {
  const router = useRouter();
  const { nome } = router.query;

  const [current, setCurrent] = React.useState(0);

  const [opcoesLista, setOpcoesLista] = useState<Models.Item[]>([]);
  const [presente, setPresente] = useState<Models.Presente>(
    {} as Models.Presente
  );
  const subcribeEvents = (
    setEvents: React.Dispatch<React.SetStateAction<Models.Item[]>>
  ) => {
    const eventsCollection = itensColletion;
    const q = query(eventsCollection, orderBy("nome"));
    const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
      const events: Models.Item[] = [];
      querySnapshot.forEach((doc: any) => {
        const data = doc.data();
        events.push({
          ...data,
        });
      });
      setEvents(events.filter((item) => item.status !== "indisponivel"));
    });
    return () => {
      unsubscribe();
    };
  };

  useEffect(() => {
    return subcribeEvents(setOpcoesLista);
  }, []);

  const steps = [
    {
      title: "🧐",
      content: ListagemPresentes({
        opcoesLista,
        onChange: (presentes) => {
          setPresente({ ...presente, presentes });
        },
        selectedPresentes: presente.presentes,
        nome: nome as string,
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
        onUploadFoto: (urlFoto) => {
          setPresente({ ...presente, urlFoto });
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

  // const addDataToFirebase = (itens: Models.Item[]) => {
  //   itens.forEach((item) => {
  //     addDoc(itensColletion, item).then((ref) => {
  //       updateDoc(ref, { id: ref.id });
  //     });
  //   });
  // };

  const postPresenteFirebase = useCallback(
    (presente: Models.Presente) => {
      addDoc(presentesCollection, presente).then((ref) => {
        updateDoc(ref, { id: ref.id });
        message.success("Presente enviado!!");
        Modal.success({
          title: "Presente enviado",
          content: "Obrigado por enviar o presente",
          okText: "Acessar feed",
          onOk: () => {
            router.push("/feed");
          },
          cancelText: "Enviar outro presente",
          onCancel: () => {
            router.reload();
          },
          closable: false,
        });
      });

      presente.presentes.forEach(async (item) => {
        const itemRef = doc(database, "itens", item.id);
        const docSnap = await getDoc(itemRef);
        const itemObj = docSnap.data() as Models.Item;
        if (itemObj.qtd === 1) {
          await updateDoc(itemRef, { qtd: 0, status: "indisponivel" });
        } else {
          await updateDoc(itemRef, {
            qtd: itemObj.qtd - 1,
            status: "disponivel",
          });
        }
      });
    },
    [router]
  );

  return (
    <PageContainer pageTitle={"Presentes disponíveis"}>
      <div className="presentes-disponiveis">
        <div className="title-header">
          {/* <Button onClick={() => addDataToFirebase(dataPresentes)}>
            upload data
          </Button> */}
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
                disabled={
                  current === steps.length - 1 ||
                  (current === 1 && !presente.presentes)
                }
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
                  postPresenteFirebase({
                    ...presente,
                    nome: nome as string,
                  });
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
