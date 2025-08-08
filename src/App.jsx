import { useState } from 'react';
import { FormularioTraslado } from "./components/FormularioTraslado";
import { ListaTraslados } from "./components/ListaTraslados";
import { Header } from "./components/Header";
import { Gastos } from "./components/Gastos"; // ← Nuevo import

export const App = () => {
    const [traslados, setTraslados] = useState([]);
    const [vistaActual, setVistaActual] = useState('formulario');

    const registrarTraslado = (nuevoTraslado) => {
        const trasladoIdDate = {
            ...nuevoTraslado,
            id: Date.now(),
            fecha: new Date().toLocaleDateString(),
        };
        setTraslados([trasladoIdDate, ...traslados]);
    };

    const actualizarPagoTraslado = (id, nuevoMetodoPago) => {
        setTraslados(traslados.map(t =>
            t.id === id ? { ...t, metodoPago: nuevoMetodoPago } : t
        ));
    };

    const eliminarTraslado = (id) => {
        const confirmar = window.confirm('Deseas eliminar?');
        if (confirmar) setTraslados(traslados.filter(t => t.id !== id));
    };

    const handleCambiarVista = (nuevaVista) => {
        setVistaActual(nuevaVista);
    };

    return (
        <>
            <Header vistaActual={vistaActual} onCambiarVista={handleCambiarVista} />

            {vistaActual === 'formulario' && (
                <div className="container d-flex justify-content-center align-items-center fade-in mt-4">
                    <FormularioTraslado onRegistrarTraslado={registrarTraslado} />
                </div>
            )}

            {vistaActual === 'lista' && (
                <div className="mt-4">
                    <ListaTraslados
                        traslados={traslados}
                        onActualizarPago={actualizarPagoTraslado}
                        onEliminarTraslado={eliminarTraslado}
                    />
                </div>
            )}

            {vistaActual === 'gastos' && (
                <div className="fade-in">
                    <Gastos />
                </div>
            )}
        </>
    );
};
