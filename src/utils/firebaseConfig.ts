import appConfig from "appConfig";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const app = initializeApp(appConfig);
export const database = getFirestore(app);