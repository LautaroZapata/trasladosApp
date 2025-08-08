// Importa la función que sube una imagen individual a Cloudinary
import { subirImagenACloudinary } from "../services/cloudinaryImgs";
// Recibe un array de archivos y los sube a Cloudinary uno por uno
// Devuelve un array con las URLs de las imágenes subidas
export async function subirFotosCloudinary(fotos) {
  // Array para guardar las URLs de las fotos subidas
  const urlsFotos = [];
  // Recorre cada foto y la sube a Cloudinary
  for (const foto of fotos) {
    try {
  // Sube cada foto individualmente y guarda la URL
  const url = await subirImagenACloudinary(foto);
  // Si no se recibe una URL válida, lanza error
  if (!url) {
        console.error("No se recibió URL de Cloudinary para la foto:", foto);
        throw new Error("Error al subir una foto");
      }
  // Agrega la URL al array
  urlsFotos.push(url);
    } catch (error) {
      console.error("Error subiendo foto a Cloudinary:", error);
  // Si ocurre un error, lo muestra en consola y lo lanza
  throw error;
    }
  }
  // Devuelve el array de URLs de las fotos subidas
  return urlsFotos;
}
