import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";

export async function registrarGastoEnBdd(gasto) {
    // Se asume que gasto ya trae fechaGasto (dd/mm/yyyy) y fechaGastoEpoch
    await addDoc(collection(db, "gastos"), gasto);
}
