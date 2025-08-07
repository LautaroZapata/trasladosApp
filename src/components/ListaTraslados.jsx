export const ListaTraslados = ({ traslados, onActualizarPago }) => {
    console.log(traslados);

    const handleCambiarPago = (trasladoId, nuevoMetodo) => {
        onActualizarPago(trasladoId, nuevoMetodo);
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
                                        <li>Vehículo: <b>{traslado.tipoVehiculo}</b></li>
                                        <li>Localidad Origen: <b>{traslado.localidadOrigen}</b></li>
                                        <li>Localidad Destino: <b>{traslado.localidadDestino}</b></li>
                                        <li>Barrio: <b>{traslado.barrio}</b></li>
                                        <li>Método de Pago: <b>{traslado.metodoPago}</b></li>
                                        <li>Importe: <b>${traslado.importe}</b></li>
                                    </ul>
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
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </>
    )
}
