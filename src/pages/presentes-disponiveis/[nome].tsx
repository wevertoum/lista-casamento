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
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import itensColletion from "utils/network/itensColletion";
import presentesCollection from "utils/network/presentesCollection";
import { database } from "utils/firebaseConfig";
import ChoiceTipoPresente from "components/ChoiceTipoPresente";

const { Step } = Steps;

interface Props {}
const PresentesDisponiveis: React.FC<Props> = () => {
  const router = useRouter();
  const { nome } = router.query;

  const [current, setCurrent] = React.useState(0);
  const [tipoPresente, setTipoPresente] =
    useState<Models.TipoPresente>("presente");
  const [opcoesLista, setOpcoesLista] = useState<Models.Item[]>([]);
  const [presente, setPresente] = useState<Models.Presente>(
    {} as Models.Presente
  );
  const subcribeOpcoes = (
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
    return subcribeOpcoes(setOpcoesLista);
  }, []);

  const stepsPresente = [
    {
      title: "😎",
      content: ChoiceTipoPresente({
        onSelect: (tipoPresente: Models.TipoPresente) => {
          setTipoPresente(tipoPresente);
        },
        tipoPresente,
      }),
      canAdvance: () => tipoPresente !== undefined,
    },
    {
      title: "🎁",
      content: ListagemPresentes({
        opcoesLista,
        onChange: (presentes) => {
          setPresente({ ...presente, presentes });
        },
        selectedPresentes: presente.presentes,
        nome: nome as string,
      }),
      canAdvance: () => presente.presentes && presente.presentes.length > 0,
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
        tipoPresente,
      }),
      canAdvance: () => true,
    },
    {
      title: "✅",
      content: ConfirmFeedback({
        presente,
        nome: nome as string,
        tipoPresente,
      }),
      canAdvance: () => true,
    },
  ];

  const stepsPix = [
    {
      title: "😎",
      content: ChoiceTipoPresente({
        onSelect: (tipoPresente: Models.TipoPresente) => {
          setTipoPresente(tipoPresente);
        },
        tipoPresente,
      }),
      canAdvance: () => tipoPresente !== undefined,
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
        tipoPresente,
      }),
      canAdvance: () => true,
    },
    {
      title: "✅",
      content: ConfirmFeedback({
        presente,
        nome: nome as string,
        tipoPresente,
      }),
      canAdvance: () => true,
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
      const presentToSend = {
        ...presente,
        tipo: tipoPresente,
        presentes: tipoPresente === "presente" ? presente.presentes : [],
      } as Models.Presente;

      addDoc(presentesCollection, presentToSend).then((ref) => {
        updateDoc(ref, { id: ref.id });
        message.success("Presente enviado!!");
        Modal.success({
          title: "Presente enviado ✅",
          content: `${nome}, a parte mais importante desse momento é ter por perto pessoas que nós amamos e que caminham com a gente! Muito obrigada por abençoar a nossa casa, mas a sua amizade e as suas orações são o maior presente de todos, nos vemos! 💝`,
          okText: "Feed 🎉",
          onOk: () => {
            router.push("/feed");
          },
          cancelText: "Outro presente",
          onCancel: () => {
            router.reload();
          },
          closable: false,
          centered: true,
          okCancel: true,
        });
      });

      if (tipoPresente === "presente") {
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
      }
    },
    [nome, router, tipoPresente]
  );

  const stepTarget = tipoPresente === "pix" ? stepsPix : stepsPresente;

  return (
    <PageContainer pageTitle={"Presentes disponíveis"}>
      <div className="presentes-disponiveis">
        <div className="title-header">
          {/* <Button onClick={() => addDataToFirebase(dataPresentes)}>
            upload data
          </Button> */}
          <Typography.Title level={2}>
            {nome}, escolha seu presente! 🎁
          </Typography.Title>
        </div>

        <div className="progress">
          <Steps current={current}>
            {(tipoPresente === "pix" ? stepsPix : stepsPresente).map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
        </div>

        <div className="presentes-content">
          <div className="steps-content">{stepTarget[current].content}</div>
          <div className="steps-action">
            <Button
              shape="round"
              disabled={current === 0}
              icon={<MaterialIcon path={mdiArrowLeftCircle} />}
              onClick={() => prev()}
            >
              Voltar
            </Button>

            {current < stepTarget.length - 1 && (
              <Button
                shape="round"
                disabled={
                  current === stepTarget.length - 1 ||
                  !stepTarget[current].canAdvance()
                }
                icon={<MaterialIcon path={mdiArrowRightCircle} />}
                type="primary"
                onClick={() => next()}
              >
                Avançar
              </Button>
            )}

            {current === stepTarget.length - 1 && (
              <Button
                shape="round"
                disabled={current === stepTarget.length}
                icon={<MaterialIcon path={mdiCheckAll} />}
                type="primary"
                onClick={() => {
                  postPresenteFirebase({
                    ...presente,
                    nome: nome as string,
                    timestamp: serverTimestamp(),
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
