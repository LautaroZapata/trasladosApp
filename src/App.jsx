import { useState } from 'react';
import { FormularioTraslado } from "./components/FormularioTraslado"
import { ListaTraslados } from "./components/ListaTraslados"

export const App = () => {

    const [traslados, setTraslados] = useState([])

    const registrarTraslado = (nuevoTraslado) => {
        const trasladoIdDate = {
            ...nuevoTraslado,
            id: Date.now(), // Generar un ID único basado en la fecha y hora actual
            fecha: new Date().toLocaleDateString(), // Agregar la fecha actual
        }
        // Cambiar el orden: nuevo traslado PRIMERO
        setTraslados([trasladoIdDate, ...traslados]); // ← En lugar de [...traslados, trasladoIdDate]
    }

    const actualizarPagoTraslado = (id, nuevoMetodoPago) => {
        setTraslados(traslados.map(traslado => 
            traslado.id === id 
                ? { ...traslado, metodoPago: nuevoMetodoPago }
                : traslado
        ));
    };

    const [vistaActual, setVistaActual] = useState('formulario'); // 'formulario' o 'lista'



    const handleCambiarVista = () => {
        setVistaActual(vistaActual === 'formulario' ? 'lista' : 'formulario');
    };

    return (
        <>
            <div className="titleContainer">
                <h1 className="titles" id="titulo">Traslados App</h1>
            </div>
            
            {/* Mostrar formulario solo si vistaActual es 'formulario' */}
            {vistaActual === 'formulario' && (
                <div className="container d-flex justify-content-center align-items-center fade-in">
                    <FormularioTraslado onRegistrarTraslado={registrarTraslado}/>
                </div>
            )}
            
            <div className="container d-flex justify-content-center align-items-center">
                <button onClick={handleCambiarVista} className='btn btn-warning mt-3'>
                    {vistaActual === 'formulario' ? 'Ver Traslados' : 'Volver al Formulario'}
                </button>
            </div>

            {/* Mostrar lista solo si vistaActual es 'lista' */}
            {vistaActual === 'lista' && 
                <ListaTraslados 
                    traslados={traslados} 
                    onActualizarPago={actualizarPagoTraslado} 
                />
            }
        </>
    )
}
