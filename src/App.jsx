import { useState } from 'react';
import { FormularioTraslado } from "./components/FormularioTraslado"
import { ListaTraslados } from "./components/ListaTraslados"
import { Header } from "./components/Header"  // ← Agregar import

export const App = () => {
    const [traslados, setTraslados] = useState([])
    const [vistaActual, setVistaActual] = useState('formulario');

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

    const eliminarTraslado = (id) => {
        const confirmar = window.confirm('Deseas eliminar?');
        if (confirmar) setTraslados(traslados.filter(traslado => traslado.id !== id));
    }

    const handleCambiarVista = (nuevaVista) => {  // ← Modificar para recibir parámetro
        setVistaActual(nuevaVista);
    };

    return (
        <>
            {/* Agregar Header */}
            <Header vistaActual={vistaActual} onCambiarVista={handleCambiarVista} />
            
            {vistaActual === 'formulario' && (
                <div className="container d-flex justify-content-center align-items-center fade-in mt-4">
                    <FormularioTraslado onRegistrarTraslado={registrarTraslado}/>
                </div>
            )}

            {vistaActual === 'lista' && 
                <div className="mt-4">
                    <ListaTraslados 
                        traslados={traslados} 
                        onActualizarPago={actualizarPagoTraslado} 
                        onEliminarTraslado={eliminarTraslado}
                    />
                </div>
            }
        </>
    )
}
