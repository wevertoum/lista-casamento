import { Col, Divider, Row, Typography } from "antd";
import ListPresentesNome from "components/ListPresentesNome";
import PageContainer from "components/PageContainer/PageContainer";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import useWindowSize from "hooks/useWindowSize";
import React, { useEffect, useMemo, useState } from "react";
import presentesCollection from "utils/network/presentesCollection";
require("./Feed.less");

interface Props {}
const Feed: React.FC<Props> = () => {
  const [presentes, setPresentes] = useState<Models.Presente[]>([]);

  const subcribeOpcoes = (
    setEvents: React.Dispatch<React.SetStateAction<Models.Presente[]>>
  ) => {
    const eventsCollection = presentesCollection;
    const q = query(eventsCollection, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
      const events: Models.Presente[] = [];
      querySnapshot.forEach((doc: any) => {
        const data = doc.data();
        events.push({
          ...data,
        });
      });
      setEvents(events);
    });
    return () => {
      unsubscribe();
    };
  };

  useEffect(() => {
    return subcribeOpcoes(setPresentes);
  }, []);

  const [width] = useWindowSize();

  const span = useMemo(() => {
    if (width > 1800) {
      return 6;
    }
    if (width > 1260 && width < 1800) {
      return 8;
    }
    if (width > 800 && width < 1260) {
      return 12;
    }
    if (width < 800) {
      return 24;
    }
  }, [width]);

  return (
    <PageContainer pageTitle={"Feed de noticias"}>
      <div className="presentes-container">
        <div className="title-header">
          <Typography.Title level={4}>
            Olha só quem já participou desse momento conosco 🥳👰🏽‍♀️🤵🏾‍♂️🎁
          </Typography.Title>
        </div>
        <Divider />
        <div className="list-feed">
          <Row style={{ marginLeft: 0, marginRight: 0 }} gutter={[16, 16]}>
            {presentes.map((presente, i) => (
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
                span={span}
                key={i}
              >
                <div className="item-feed">
                  <div className="header">
                    <div className="imagem">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="display-image"
                        src={presente.urlFoto || "/default_user.svg"}
                        alt="Foto de perfil"
                      />
                    </div>
                    <div className="textos">
                      <Typography.Title level={4}>
                        {presente.nome}
                      </Typography.Title>
                      {presente.mensagem && (
                        <Typography.Paragraph>
                          {presente.mensagem}
                        </Typography.Paragraph>
                      )}
                    </div>
                  </div>
                  <Divider />
                  <ListPresentesNome
                    tipo={presente.tipo}
                    itens={presente.presentes}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </PageContainer>
  );
};

export default Feed;
