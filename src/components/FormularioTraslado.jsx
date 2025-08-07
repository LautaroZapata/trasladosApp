import { useState } from "react"
import { InputLocalidad } from "./InputLocalidad"
import { InputPago } from "./InputPago"
import { InputVehiculo } from "./InputVehiculo"

export const FormularioTraslado = ({onRegistrarTraslado}) => {

    const [formulario, setFormulario] = useState({
        tipoVehiculo: '',
        localidadOrigen: 'Montevideo',
        localidadDestino: 'Artigas',
        barrio: '',
        metodoPago: 'pendiente',
        importe: ''
    })

    const handleSubmit = (eventoSubmit) => {
        eventoSubmit.preventDefault();
        console.log('Datos del formulario:', formulario);
        onRegistrarTraslado(formulario); // Llamar a la función para registrar el traslado
        setFormulario({
            tipoVehiculo: '',
            localidadOrigen: '',
            localidadDestino: '',
            barrio: '',
            metodoPago: 'pendiente',
            importe: ''
        })
    }


    

    return (
        <>
            <form onSubmit={handleSubmit} className="mx-auto d-flex flex-column w-100">
                <div className="mb-3 d-flex justify-content-center">
                    <InputVehiculo 
                        value={formulario.tipoVehiculo}
                        onChange={(valor) => setFormulario({
                            ...formulario, tipoVehiculo:valor
                        })}
                    />
                </div>
                <div className="mb-3 d-flex flex-column align-items-center justify-content-center">
                    <InputLocalidad
                        valueOrigen={formulario.localidadOrigen}
                        valueDestino={formulario.localidadDestino}
                        valueBarrio={formulario.barrio}
                        onChangeOrigen= { (valor) => setFormulario( {
                            ...formulario, localidadOrigen: valor
                        } ) }
                        onChangeDestino= { (valor) => setFormulario( {
                            ...formulario, localidadDestino: valor
                        } ) }
                        onChangeBarrio= { (valor) => setFormulario( {
                            ...formulario, barrio: valor
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
                    <button type="submit"  className="btn btn-primary">Registrar Traslado</button>
                </div>
            </form>

        </>
    )
}
