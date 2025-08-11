// Importa los hooks y componentes necesarios de React y utilidades propias
import { useState } from "react";
import imageCompression from "browser-image-compression";
import { InputLocalidad } from "./InputLocalidad";
import { InputPago } from "./InputPago";
import { InputVehiculo } from "./InputVehiculo";
import { validarFormularioTraslado } from "../utils/validacionesTraslado";
import { subirFotosCloudinary } from "../utils/subidaFotosCloudinary";
import { registrarTrasladoEnBdd } from "../utils/registrarTraslado";

// Componente principal para registrar traslados
export const FormularioTraslado = ( ) => {
  // Estado para los datos del formulario
  const [formulario, setFormulario] = useState({
    marcaVehiculo: "Audi",
    matricula: "",
    localidadOrigen: "Montevideo",
    localidadDestino: "Montevideo",
    barrioOrigen: "",
    barrioDestino: "",
    metodoPago: "pendiente",
    importe: "",
  });

  // Estado para las fotos seleccionadas
  const [fotos, setFotos] = useState([]);
  // Estado para mostrar notificaciones al usuario
  const [notificacion, setNotificacion] = useState("");
  // Estado para mostrar el popup de loading/spinner
  const [loading, setLoading] = useState(false);

  // Maneja el cambio de archivos en el input de fotos, comprimiendo antes de guardar
  // Limita a 5 imágenes y comprime cada una antes de guardarla
  const handleFileChange = async (e) => {
    const nuevosArchivos = Array.from(e.target.files);
    // Opciones de compresión: calidad y tamaño máximo
    const options = {
      maxSizeMB: 0.5, // máximo 0.5 MB por imagen
      maxWidthOrHeight: 1024, // máximo 1024px de ancho o alto
      useWebWorker: true
    };
    // Comprimir cada imagen antes de guardar
    const comprimidos = await Promise.all(
      nuevosArchivos.map(async (file) => {
        try {
          const compressedBlob = await imageCompression(file, options);
          // Convertir Blob a File si es necesario
          if (compressedBlob instanceof File) {
            return compressedBlob;
          } else {
            return new File([compressedBlob], file.name, { type: compressedBlob.type });
          }
        } catch (err) {
          console.error("Error al comprimir imagen:", err);
          return file;
        }
      })
    );
    setFotos((prevFotos) => { // Actualiza el estado de fotos 
      const total = prevFotos.length + comprimidos.length;
      if (total <= 5) {
        return [...prevFotos, ...comprimidos];
      } else {
        const disponibles = 5 - prevFotos.length;
        return [...prevFotos, ...comprimidos.slice(0, disponibles)];
      }
    });
  };

  // Maneja el envío del formulario
  // Valida los datos, sube las fotos a Cloudinary, registra el traslado en Firestore y muestra loading/notificaciones
  const handleSubmit = async (eventoSubmit) => {
    eventoSubmit.preventDefault();
    setLoading(true);

    // Validar los datos del formulario
    const error = validarFormularioTraslado(formulario);
    if (error) {
      alert(error);
      setLoading(false);
      return;
    }

    // Subir las fotos a Cloudinary y obtener las URLs
    let urlsFotos = [];
    try {
      urlsFotos = await subirFotosCloudinary(fotos);
    } catch (error) {
      setNotificacion("Error al subir las fotos. Inténtalo de nuevo.");
      setTimeout(() => setNotificacion(""), 3000);
      setLoading(false);
      return;
    }

    // Registrar el traslado en la base de datos (Firestore)
    try {
      await registrarTrasladoEnBdd(formulario, urlsFotos);
      // Limpiar el formulario y mostrar notificación de éxito
      setFormulario({
        marcaVehiculo: "Audi",
        matricula: "",
        localidadOrigen: "Montevideo",
        localidadDestino: "Montevideo",
        barrioOrigen: "",
        barrioDestino: "",
        metodoPago: "pendiente",
        importe: "",
      });
      setFotos([]);
      setNotificacion("¡Traslado registrado exitosamente!");
      setTimeout(() => setNotificacion(""), 3000);
    } catch (error) {
      console.error("Error al registrar:", error);
      setNotificacion("Error al registrar el traslado. Inténtalo de nuevo.");
      setTimeout(() => setNotificacion(""), 3000);
    }
    setLoading(false);
  };

  // Renderiza el formulario y los componentes de entrada
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto d-flex flex-column w-100 gap-3"
      >
        {/* Inputs para vehículo */}
        <div className="mb-1 d-flex justify-content-center flex-column align-items-center">
          <InputVehiculo
            value={formulario.marcaVehiculo}
            onChange={(valor) =>
              setFormulario({
                ...formulario,
                marcaVehiculo: valor,
              })
            }
            valueMatricula={formulario.matricula}
            onChangeMatricula={(valor) =>
              setFormulario({
                ...formulario,
                matricula: valor,
              })
            }
          />
        </div>
        {/* Inputs para localidades y barrios */}
        <div className="mb-1 d-flex flex-column align-items-center justify-content-center gap-2">
          <InputLocalidad
            valueOrigen={formulario.localidadOrigen}
            valueDestino={formulario.localidadDestino}
            valueBarrioOrigen={formulario.barrioOrigen}
            valueBarrioDestino={formulario.barrioDestino}
            onChangeOrigen={(valor) =>
              setFormulario({
                ...formulario,
                localidadOrigen: valor,
              })
            }
            onChangeDestino={(valor) =>
              setFormulario({
                ...formulario,
                localidadDestino: valor,
              })
            }
            onChangeBarrioOrigen={(valor) =>
              setFormulario({
                ...formulario,
                barrioOrigen: valor.toUpperCase(),
              })
            }
            onChangeBarrioDestino={(valor) =>
              setFormulario({
                ...formulario,
                barrioDestino: valor.toUpperCase(),
              })
            }
          />
        </div>
        {/* Inputs para método de pago e importe */}
        <div className="mb-1 d-flex flex-column align-items-center justify-content-center">
          <InputPago
            valuePago={formulario.metodoPago}
            valueImporte={formulario.importe}
            onChangePago={(valor) =>
              setFormulario({
                ...formulario,
                metodoPago: valor,
              })
            }
            onChangeImporte={(valor) =>
              setFormulario({
                ...formulario,
                importe: valor,
              })
            }
          />
        </div>

        {/* Input para subir fotos */}
        <div className="my-3 d-flex  justify-content-center">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>

        {/* Previsualización de fotos seleccionadas */}
        <div className="mb-3 d-flex justify-content-center flex-wrap">
          {fotos.map((foto, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(foto)}
              alt={`Foto ${idx + 1}`}
              style={{ width: "100px", margin: "5px" }}
            />
          ))}
        </div>

        {/* Botón para registrar traslado */}
        <div className="mb-3 d-flex justify-content-center">
          <button type="submit" className="btn btn-primary texts p-3" disabled={loading}>
            {loading ? "Registrando..." : "Registrar Traslado"}
          </button>
        </div>

        {/* Popup de loading/spinner mientras se procesa el registro */}
        {loading && (
          <div className="traslados-loading-overlay">
            <div className="traslados-loading-popup">
              <span className="spinner-border" role="status" aria-hidden="true" style={{width: "3rem", height: "3rem"}}></span>
              <span className="traslados-loading-text">Procesando registro...</span>
            </div>
          </div>
        )}

        {/* Notificación de éxito o error */}
        {notificacion && (
          <div className="traslados-notificacion">
            {notificacion}
          </div>
        )}
      </form>
    </>
  );
};
