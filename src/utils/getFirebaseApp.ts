import { initializeApp } from "firebase/app";
import "firebase/storage";
import appConfig from "../appConfig";

const getFirebaseApp = function () {
  const app = initializeApp(appConfig);
  return { app };
};

export default getFirebaseApp;
