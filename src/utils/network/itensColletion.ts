import { collection } from "firebase/firestore";
import { database } from "utils/firebaseConfig";

const itensColletion = collection(database, "itens");
export default itensColletion;