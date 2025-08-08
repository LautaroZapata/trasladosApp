import { useState } from "react";
import imageCompression from "browser-image-compression";
import { InputLocalidad } from "./InputLocalidad";
import { InputPago } from "./InputPago";
import { InputVehiculo } from "./InputVehiculo";
import { validarFormularioTraslado } from "../utils/validacionesTraslado";
import { subirFotosCloudinary } from "../utils/subidaFotosCloudinary";
import { registrarTrasladoEnBdd } from "../utils/registrarTraslado";

export const FormularioTraslado = ( ) => {
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

  // Componente principal para registrar traslados
  // Permite ingresar datos, subir fotos y guardar en Firestore
  const [fotos, setFotos] = useState([]);
  const [notificacion, setNotificacion] = useState("");

  // Maneja el cambio de archivos en el input de fotos, comprimiendo antes de guardar
  const handleFileChange = async (e) => {
    const nuevosArchivos = Array.from(e.target.files);
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1024,
      useWebWorker: true
    };
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
    setFotos((prevFotos) => {
      const total = prevFotos.length + comprimidos.length;
      if (total <= 5) {
        return [...prevFotos, ...comprimidos];
      } else {
        const disponibles = 5 - prevFotos.length;
        return [...prevFotos, ...comprimidos.slice(0, disponibles)];
      }
    });
  };

  const handleSubmit = async (eventoSubmit) => {
    eventoSubmit.preventDefault();

    const error = validarFormularioTraslado(formulario); // Lo que hace esto es validar el formulario y devolver un mensaje de error si hay algo mal
    if (error) {
      alert(error);
      return;
    }

    let urlsFotos = [];
    try {
      urlsFotos = await subirFotosCloudinary(fotos);
    } catch (error) {
      setNotificacion("Error al subir las fotos. Inténtalo de nuevo.");
      setTimeout(() => setNotificacion(""), 3000);
      return;
    }

    // Creamos el objeto con los datos para registrar en la base de datos
    const registrarTrasladoBdd = {
      ...formulario, // Trae todos los campos del formulario
      fotos: urlsFotos, // Agrega las URLs de las fotos
      fechaRegistro: new Date().toLocaleDateString("es-UY"), // Agrega la fecha de registro
    };

    try {
      await registrarTrasladoEnBdd(formulario, urlsFotos);

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
      setNotificacion("¡Traslado registrado exitosamente!");
      setTimeout(() => setNotificacion(""), 3000);
    } catch (error) {
      console.error("Error al registrar:", error);
      setNotificacion("Error al registrar el traslado. Inténtalo de nuevo.");
      setTimeout(() => setNotificacion(""), 3000);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto d-flex flex-column w-100"
      >
        <div className="mb-3 d-flex justify-content-center flex-column align-items-center">
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
        <div className="mb-3 d-flex flex-column align-items-center justify-content-center">
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
        <div className="mb-3 d-flex flex-column align-items-center justify-content-center">
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

        <div className="mb-3 d-flex  justify-content-center">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>

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

        <div className="mb-3 d-flex justify-content-center">
          <button type="submit" className="btn btn-primary texts">
            Registrar Traslado
          </button>
        </div>

        {notificacion && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#d4edda",
              color: "#155724",
              padding: "18px 40px",
              borderRadius: "10px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
              zIndex: 9999,
              fontWeight: "bold",
              fontSize: "1.15rem",
              textAlign: "center",
            }}
          >
            {notificacion}
          </div>
        )}
      </form>
    </>
  );
};
