import appConfig from "appConfig";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { 
  getStorage
 } from "firebase/storage";

export const app = initializeApp(appConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);