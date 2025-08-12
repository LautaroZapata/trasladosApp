export const GastosListadoCompleto = ({ gastos, cargando, onEliminar }) => {
    if (cargando) return <p className="textSmall text-center">Cargando...</p>;
    if (!gastos.length) return <p className="textSmall text-center">Sin gastos.</p>;

    return (
        <div className="d-flex flex-column gap-2">
            {gastos.map(g => (
                <div key={g.id} className="card text-white border-0  position-relative gastoCard">
                    <div className="d-flex flex-column gap-2">
                        <div className="d-flex align-items-center gap-2">
                            <img src="/gas-station.png" alt="motivo" height="20" className="iconOrange" />
                            <h6 className="mb-0">{g.motivo}</h6>
                            <span className="ms-auto fw-bold">${g.importe}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <img src="/date.png" alt="fecha" height="18" className="iconOrange" />
                            <small>{g.fechaGasto}</small>
                        </div>
                        <div className="d-flex align-items-start gap-2 pe-4">
                            <img src="/note.png" alt="desc" height="18" className="iconOrange" />
                            <small className="textSmall">{g.desc || "Sin descripción"}</small>
                        </div>
                    </div>
                    {onEliminar && (
                        <button
                            type="button"
                            className="btn btn-sm position-absolute bottom-0 end-0 m-2 d-flex align-items-center justify-content-center"
                            style={{ width: "34px", height: "34px" }}
                            onClick={() => onEliminar(g.id)}
                            title="Eliminar gasto"
                        >
                            <img src="/delete.png" alt="del" height="18" />
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};