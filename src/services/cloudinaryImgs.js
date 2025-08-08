// Recibe un archivo de imagen y lo sube a Cloudinary
// Devuelve la URL segura de la imagen subida
export async function subirImagenACloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`;
  // URL de la API de Cloudinary
  const formData = new FormData();
  // Prepara los datos para enviar a Cloudinary
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  formData.append("file", file); // Archivo de imagen
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); // Preset unsigned configurado en Cloudinary
  try {
  // Realiza la petición POST a Cloudinary
    const response = await fetch(url, {
      method: "POST",
      body: formData
    });
    const data = await response.json(); // Respuesta de Cloudinary
    if (!response.ok) {
      console.error("Cloudinary error response:", data);
      throw new Error(data.error?.message || "Error en Cloudinary");
    }
  // Si no se recibió la URL segura
    if (!data.secure_url) {
      console.error("No se recibió secure_url de Cloudinary:", data);
      throw new Error("No se recibió secure_url de Cloudinary");
    }
    return data.secure_url;
  } catch (error) {
  // Si ocurre un error en la petición, lo muestra en consola y lo lanza
    console.error("Error en fetch a Cloudinary:", error);
    throw error;
  }
}