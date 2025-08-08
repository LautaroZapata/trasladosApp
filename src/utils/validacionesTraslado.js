// Función para validar los datos del formulario de traslado
// Devuelve un string con el mensaje de error, o null si todo está bien
import { validarMatricula } from "./validacionMatricula";

export function validarFormularioTraslado(formulario) {
  if (!formulario.marcaVehiculo) {
    return "Por favor selecciona una marca de vehículo";
  }
  if (!formulario.matricula) {
    return "Por favor ingresa la matrícula";
  }
  if (!validarMatricula(formulario.matricula)) {
    return "La matrícula debe tener el formato: ABC1234 (3 letras + 4 números)";
  }
  if (!formulario.localidadOrigen) {
    return "Por favor selecciona una localidad de origen";
  }
  if (!formulario.localidadDestino) {
    return "Por favor selecciona una localidad de destino";
  }
  if (!formulario.importe) {
    return "Por favor ingresa un importe";
  }
  return null;
}
