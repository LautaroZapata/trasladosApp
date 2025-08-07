import { useState } from "react"
import { InputLocalidad } from "./InputLocalidad"
import { InputPago } from "./InputPago"
import { InputVehiculo } from "./InputVehiculo"
import { validarMatricula } from "../utils/validacionMatricula"

export const FormularioTraslado = ({onRegistrarTraslado}) => {

    const [formulario, setFormulario] = useState({
        marcaVehiculo: 'Audi',
        matricula: '',
        localidadOrigen: 'Montevideo',
        localidadDestino: 'Artigas',
        barrioOrigen: '',
        barrioDestino: '',
        metodoPago: 'pendiente',
        importe: ''
    })

    const handleSubmit = (eventoSubmit) => {
        eventoSubmit.preventDefault();
        
        // Validar marca de vehículo
        if (!formulario.marcaVehiculo) {
            alert('Por favor selecciona una marca de vehículo');
            return;
        }
        
        // Validar matrícula
        if (!formulario.matricula) {
            alert('Por favor ingresa la matrícula');
            return;
        }
        
        // Validar formato de matrícula
        if (!validarMatricula(formulario.matricula)) {
            alert('La matrícula debe tener el formato: ABC1234 (3 letras + 4 números)');
            return;
        }
        
        // Validar localidades
        if (!formulario.localidadOrigen) {
            alert('Por favor selecciona una localidad de origen');
            return;
        }
        
        if (!formulario.localidadDestino) {
            alert('Por favor selecciona una localidad de destino');
            return;
        }
        
        // Validar importe
        if (!formulario.importe) {
            alert('Por favor ingresa un importe');
            return;
        }
        
        // Si todas las validaciones pasan:
        onRegistrarTraslado(formulario);
        setFormulario({
            marcaVehiculo: 'Audi',
            matricula: '',
            localidadOrigen: 'Montevideo',
            localidadDestino: 'Artigas',
            barrioOrigen: '',
            barrioDestino: '',
            metodoPago: 'pendiente',
            importe: ''
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="mx-auto d-flex flex-column w-100">
                <div className="mb-3 d-flex justify-content-center flex-column align-items-center">
                    <InputVehiculo
                        value={formulario.marcaVehiculo}
                        onChange={(valor) => setFormulario({
                            ...formulario, marcaVehiculo:valor
                        })}
                        valueMatricula={formulario.matricula}
                        onChangeMatricula={(valor) => setFormulario({
                            ...formulario, matricula:valor
                        })}
                    />
                </div>
                <div className="mb-3 d-flex flex-column align-items-center justify-content-center">
                    <InputLocalidad
                        valueOrigen={formulario.localidadOrigen}
                        valueDestino={formulario.localidadDestino}
                        valueBarrioOrigen={formulario.barrioOrigen}
                        valueBarrioDestino={formulario.barrioDestino}
                        onChangeOrigen= { (valor) => setFormulario( {
                            ...formulario, localidadOrigen: valor
                        } ) }
                        onChangeDestino= { (valor) => setFormulario( {
                            ...formulario, localidadDestino: valor
                        } ) }
                        onChangeBarrioOrigen= { (valor) => setFormulario( {
                            ...formulario, barrioOrigen: valor
                        } ) }
                        onChangeBarrioDestino= { (valor) => setFormulario( {
                            ...formulario, barrioDestino: valor
                        } ) }

                    />
                </div>
                <div className="mb-3 d-flex flex-column align-items-center justify-content-center">
                    <InputPago
                        valuePago={formulario.metodoPago}
                        valueImporte={formulario.importe}
                        onChangePago= {(valor)=> setFormulario ({
                            ...formulario, metodoPago: valor
                        })}
                        onChangeImporte= {(valor)=> setFormulario ({
                            ...formulario, importe: valor
                        })}

                    />
                </div>
                <div className="mb-3 d-flex justify-content-center">
                    <button type="submit"  className="btn btn-primary texts">Registrar Traslado</button>
                </div>
            </form>

        </>
    )
}
