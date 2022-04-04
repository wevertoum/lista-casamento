import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/Presentes.module.css";

interface Props {}
const PresentesDisponiveis: React.FC<Props> = () => {
  const router = useRouter();
  const { nome } = router.query;
  return <>eai: {nome}</>;
};

export default PresentesDisponiveis;
