import {
  Alert,
  Col,
  Divider,
  Input,
  message,
  Progress,
  Radio,
  Row,
  Typography,
  Upload,
} from "antd";
import ItemPresente from "components/ItemPresente";
import useWindowSize from "hooks/useWindowSize";
import React, { useMemo, useState } from "react";
import { debounce } from "lodash";
import Image from "next/image";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "utils/firebaseConfig";
require("./InfosDoPresente.less");

interface Props {
  onSelectTipoEntrega: (tipoEntrega: Models.TipoEntrega) => void;
  onWriteMessage: (message: string) => void;
  onUploadFoto: (urlFoto: string) => void;
  presente: Models.Presente;
  tipoPresente?: Models.TipoPresente;
}
const InfosDoPresente: React.FC<Props> = ({
  onSelectTipoEntrega,
  onWriteMessage,
  onUploadFoto,
  presente,
  tipoPresente,
}) => {
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

  const [tipoEntrega, setTipoEntrega] = useState<Models.TipoEntrega>();

  const onMessageThrottled = debounce(onWriteMessage, 1000);

  const [progress, setProgress] = useState(0);
  const [urlImage, setUrlImage] = useState<string>();
  const [mensagem, setMensagem] = useState(presente.mensagem || "");

  const handleFireBaseUpload = (e: any) => {
    const imageForReq = e.file;
    if (imageForReq === "") {
      message.error("Imagem inválida");
    }
    const mountainsRef = ref(storage, `imagens/${imageForReq.name}`);
    const uploadTask = uploadBytesResumable(mountainsRef, imageForReq);

    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => {
        console.log("erro >>> ", err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          onUploadFoto(url);
          setUrlImage(url);
          setProgress(0);
        });
      }
    );
  };

  const alertContent = useMemo(() => {
    if (tipoEntrega === "levar_no_dia") {
      return {
        message: "Você escolheu entregar no chá de panela",
        description:
          "nos vemos no dia 13 de agosto, estamos animados para celebrar esse momento com você!",
        type: "success",
        showIcon: true,
      };
    } else if (tipoEntrega === "enviar_domicilio") {
      return {
        message: "Você escolheu enviar pra gente",
        description: (
          <>
            <Typography.Title level={5}>
              Aqui estão os dados para entrega:
            </Typography.Title>
            <Typography.Paragraph>
              Ana Laura Costa Rodrigues, Rua 404, nº 101. Condomínio Recanto
              Praças 2, Casa 46, Negrão de Lima. Goiânia, Goiás. 74.650-360
            </Typography.Paragraph>
          </>
        ),
        type: "info",
        showIcon: true,
      };
    }
  }, [tipoEntrega]);

  return (
    <>
      {(presente.presentes || []).length > 0 ? (
        <>
          <div className="infos-description">
            <Typography.Title level={4}>
              Presentes escolhidos! Muito obrigado! 💝
            </Typography.Title>
            <Divider />
          </div>
          <div className="infos-content">
            {tipoPresente === "presente" ? (
              <Row
                style={{ marginLeft: 0, marginRight: 0, width: "100%" }}
                gutter={[16, 16]}
              >
                {(presente.presentes || []).map((item, i) => (
                  <Col
                    style={{ display: "flex", justifyContent: "center" }}
                    span={span}
                    key={i}
                  >
                    <ItemPresente item={item} />
                  </Col>
                ))}
              </Row>
            ) : (
              <Typography.Title level={3}>
                Você escolher contribuir com pix
              </Typography.Title>
            )}
          </div>
          <Divider />
          <div className="infos-description-entrega">
            <Typography.Title level={4}>
              O que você prefere? 📦
            </Typography.Title>
          </div>
          <Radio.Group
            onChange={(e) => {
              onSelectTipoEntrega(e.target.value);
              setTipoEntrega(e.target.value);
            }}
            value={presente.tipoEntrega}
          >
            <Radio value={"levar_no_dia"}>Levar no Chá de panela</Radio>
            <Radio value={"enviar_domicilio"}>Mandar entregar para vocês</Radio>
          </Radio.Group>
          <div className="alert-container">
            {tipoEntrega && (
              <Alert
                message={alertContent?.message}
                description={alertContent?.description}
                type={alertContent?.type as any}
                showIcon
              />
            )}
          </div>

          <Divider />
          <Typography.Title level={4}>
            Antes de ir, deixe um recadinho pra gente registrado aqui!
          </Typography.Title>
          <div className="infos-mensagem">
            <div className="upload-foto">
              <Upload
                accept="image/*"
                customRequest={handleFireBaseUpload}
                listType="picture-card"
                showUploadList={false}
              >
                {urlImage ? (
                  <Image src={urlImage} alt="avatar" width={200} height={200} />
                ) : (
                  <Image
                    src={"/upload_photo.svg"}
                    alt="avatar"
                    width={200}
                    height={200}
                  />
                )}
              </Upload>
              {progress > 0 && (
                <Progress
                  strokeColor={{
                    "0%": "#624103",
                    "100%": "#a87008",
                  }}
                  percent={progress}
                />
              )}
              <Typography.Text strong>Sua fotinha!</Typography.Text>
            </div>
            <div className="mensagem-feed">
              <Input.TextArea
                value={mensagem}
                rows={3}
                placeholder="Escreva uma mensagem legal"
                onChange={(e) => {
                  onMessageThrottled(e.target.value);
                  setMensagem(e.target.value);
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="lista-vazia">
          <Typography.Title level={4}>
            Você ainda não selecionou nenhum presente!
          </Typography.Title>
          <Image
            height={200}
            width={200}
            src={"/empty.svg"}
            alt="Lista vazia"
          />
        </div>
      )}
    </>
  );
};

export default InfosDoPresente;
