import { collection } from "firebase/firestore";
import { database } from "utils/firebaseConfig";

const presentesCollection = collection(database, "presentes");
export default presentesCollection;