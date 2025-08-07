export const ListaTraslados = ({ traslados, onActualizarPago, onEliminarTraslado }) => {
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
                            traslados.map((traslado) => (
                                <div key={traslado.id} className="cardTraslado mb-3 fade-in">
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
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </>
    )
}
