import { useState } from "react";

export const ListaTraslados = ({ traslados, onActualizarPago, onEliminarTraslado }) => {
    
    const [fotoSeleccionada, setFotoSeleccionada] = useState(null);

    const handleCambiarPago = (trasladoId, nuevoMetodo) => {
        onActualizarPago(trasladoId, nuevoMetodo);
    };

    const handleEliminar = (trasladoId) => {
        onEliminarTraslado(trasladoId);
    };

        return (
            <>
                <div>
                    <h2 className="text-center">Lista de Traslados</h2>
                    <div className="d-flex flex-column align-items-center">
                        {traslados.length === 0 ? (<p>No hay traslados registrados</p>) :
                            (
                                traslados.map((traslado, idx) => (
                                    <div key={idx} className="cardTraslado mb-3 fade-in">
                                        <p>ID: {traslado.id}</p>
                                        <p>Fecha: {traslado.fecha}</p>
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
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '10px 0' }}>
                                            {traslado.fotos && traslado.fotos.map((foto, fIdx) => (
                                                <img
                                                    key={fIdx}
                                                    src={typeof foto === 'string' ? foto : URL.createObjectURL(foto)}
                                                    alt={`Foto ${fIdx + 1}`}
                                                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #eee', cursor: 'pointer' }}
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
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'rgba(0,0,0,0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 9999
                        }}
                        onClick={() => setFotoSeleccionada(null)}
                    >
                        <img
                            src={typeof fotoSeleccionada === 'string' ? fotoSeleccionada : URL.createObjectURL(fotoSeleccionada)}
                            alt="Foto en pantalla completa"
                            style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: '10px' }}
                            onClick={e => e.stopPropagation()}
                        />
                    </div>
                )}
            </>
        )
}
