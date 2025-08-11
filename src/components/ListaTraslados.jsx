import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { ExportarTraslados } from "./ButtonCsv";

// Componente que muestra la lista de traslados obtenidos de Firestore
export const ListaTraslados = () => {
    const [traslados, setTraslados] = useState([]);
    const [fotoSeleccionada, setFotoSeleccionada] = useState(null);

    // Helper para convertir "dd/mm/yyyy" a timestamp
    const parseFecha = (s) => {
        if (!s) return 0;
        const [d, m, y] = s.split(/[\/\-]/).map(Number);
        return new Date(y, m - 1, d).getTime();
    };

    const cargarTraslados = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "traslados"));
            const trasladosFirestore = querySnapshot.docs.map(d => ({
                id: d.id,
                ...d.data()
            }));
            trasladosFirestore.sort((a, b) => parseFecha(b.fechaRegistro) - parseFecha(a.fechaRegistro)); // descendente
            setTraslados(trasladosFirestore);
        } catch (error) {
            console.error("Error al cargar traslados:", error);
        }
    };

    useEffect(() => {
        cargarTraslados();
    }, []);

    // Actualiza el método de pago en Firestore y refresca la lista
    const handleCambiarPago = async (trasladoId, nuevoMetodo) => {
        try {
            await updateDoc(doc(db, "traslados", trasladoId), { metodoPago: nuevoMetodo });
            await cargarTraslados();
        } catch (error) {
            console.error("Error al actualizar método de pago:", error);
        }
    };

    // Elimina el traslado de Firestore y refresca la lista
    const handleEliminar = async (trasladoId) => {
        if (!window.confirm("¿Estás seguro que querés eliminar este traslado? Esta acción no se puede deshacer.")) return;
        try {
            await deleteDoc(doc(db, "traslados", trasladoId));
            await cargarTraslados();
        } catch (error) {
            console.error("Error al eliminar traslado:", error);
        }
    };

    return (
        <>
            <div className="d-flex flex-column">
                <h2 className="text-center">Lista de Traslados</h2>
                <ExportarTraslados traslados={traslados}  />
                <div className="d-flex flex-column align-items-center">
                    {traslados.length === 0 ? (<p>No hay traslados registrados</p>) :
                        (
                            traslados.map((traslado, idx) => (
                                <div key={idx} className="cardTraslado mb-3 fade-in">
                                    <p>ID: {traslado.id}</p>
                                    <p>Fecha: {traslado.fechaRegistro}</p>
                                    <ul>
                                        <li>Vehículo: <b>{traslado.marcaVehiculo}</b></li>
                                        <li>Matricula: <b>{traslado.matricula}</b></li>
                                        <li>Origen: <b>{traslado.localidadOrigen}, {traslado.barrioOrigen}</b></li>
                                        <li>Destino: <b>{traslado.localidadDestino}, {traslado.barrioDestino}</b></li>
                                        <li>Método de Pago: <b>{traslado.metodoPago}</b></li>
                                        <li>Importe: <b>${traslado.importe}</b></li>
                                    </ul>
                                    <div className="d-flex justify-content-between mt-2">
                                        {traslado.metodoPago === 'pendiente' ? (
                                            <select
                                                value={traslado.metodoPago}
                                                onChange={(e) => handleCambiarPago(traslado.id, e.target.value)}
                                                className="form-select form-select-sm"
                                            >
                                                <option value="pendiente">Pago pendiente</option>
                                                <option value="efectivo">Efectivo</option>
                                                <option value="credito">Crédito</option>
                                                <option value="transferencia">Transferencia</option>
                                            </select>
                                        ) : (
                                            <span className="badge bg-success">{traslado.metodoPago.toUpperCase()}</span>
                                        )}
                                        <button
                                            onClick={() => handleEliminar(traslado.id)}
                                            className="btn btn-danger btn-sm"
                                        >
                                            ⚠️ Eliminar
                                        </button>
                                    </div>
                                    {/* Galería de imágenes */}
                                    <div className="galeria-fotos">
                                        {traslado.fotos && traslado.fotos.map((foto, fIdx) => (
                                            <img
                                                key={fIdx}
                                                src={typeof foto === 'string' ? foto : URL.createObjectURL(foto)}
                                                alt={`Foto ${fIdx + 1}`}
                                                className="galeria-foto"
                                                onClick={() => setFotoSeleccionada(foto)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
            {/* Modal para mostrar la foto en pantalla completa */}
            {fotoSeleccionada && (
                <div
                    className="modal-overlay"
                    onClick={() => setFotoSeleccionada(null)}
                >
                    <img
                        src={typeof fotoSeleccionada === 'string' ? fotoSeleccionada : URL.createObjectURL(fotoSeleccionada)}
                        alt="Foto en pantalla completa"
                        className="modal-image"
                        onClick={e => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    )
}
