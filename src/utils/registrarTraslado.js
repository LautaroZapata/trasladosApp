import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";

export async function registrarTrasladoEnBdd(formulario, urlsFotos) {
  const traslado = {
    ...formulario,
    fotos: urlsFotos,
    fechaRegistro: new Date().toLocaleDateString("es-UY"),
  };
  await addDoc(collection(db, "traslados"), traslado);
}
