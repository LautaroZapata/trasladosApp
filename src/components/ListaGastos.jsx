import { useEffect, useRef, useState } from "react";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { GastosListadoCompleto } from "./GastosListadoCompleto"; // <--- nuevo

export const ListaGastos = () => {
    const [gastosAll, setGastosAll] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [showFull, setShowFull] = useState(false);
    const contRef = useRef(null);

    useEffect(() => {
        const colRef = collection(db, "gastos");
        const unsub = onSnapshot(colRef, snap => {
            let arr = snap.docs.map(d => {
                const data = d.data();
                const epoch = data.fechaGastoEpoch ??
                    (() => {
                        if (!data.fechaGasto) return 0;
                        const [dd, mm, yyyy] = data.fechaGasto.split(/[\/\-]/).map(Number);
                        return new Date(yyyy, mm - 1, dd).getTime();
                    })();
                return { id: d.id, ...data, _epoch: epoch };
            });
            arr.sort((a, b) => b._epoch - a._epoch);
            setGastosAll(arr);
            setCargando(false);
        }, err => {
            console.error("onSnapshot gastos:", err);
            setCargando(false);
        });
        return () => unsub();
    }, []);

    useEffect(() => {
        contRef.current?.scrollTo({ left: 0 });
    }, [gastosAll]);

    const handleEliminar = async (id) => {
        if (!window.confirm("¿Eliminar este gasto?")) return;
        try {
            await deleteDoc(doc(db, "gastos", id));
            // No setState manual: onSnapshot actualiza solo
        } catch (e) {
            console.error("Error eliminando gasto:", e);
        }
    };

    if (showFull) {
        return (
            <div className="gastosWrapper">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="mb-0">Listado de Gastos</h3>
                    <button className="btn btn-secondary btn-sm textSmall" onClick={() => setShowFull(false)}>
                        ← Volver
                    </button>
                </div>
                <GastosListadoCompleto
                    gastos={gastosAll}
                    cargando={cargando}
                    onEliminar={handleEliminar}
                />
            </div>
        );
    }

    const gastosTop3 = gastosAll.slice(0, 3);

    return (
        <div className="gastosWrapper">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h3 className="mb-0">Últimos Gastos</h3>
                <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none textSmall btnVerGastos"
                    onClick={() => setShowFull(true)}
                >
                    Ver Gastos »
                </button>
            </div>

            {cargando && <p className="textSmall text-center">Cargando gastos...</p>}
            {!cargando && gastosTop3.length === 0 && (
                <p className="textSmall text-center my-4">Sin gastos registrados.</p>
            )}

            {!cargando && gastosTop3.length > 0 && (
                /* Carrusel horizontal solo con utilidades Bootstrap */
                <div
                    ref={contRef}
                    className="d-flex flex-nowrap gap-3 overflow-auto p-0"
                    style={{ scrollSnapType: "x mandatory" }}
                >
                    {gastosTop3.map(g => (
                        <div
                            key={g.id}
                            className="card text-white border-0  position-relative gastoCard"
                            style={{ width: "16rem", scrollSnapAlign: "start" }}
                        >
                            <div className=" d-flex flex-column gap-2">
                                <div className="d-flex align-items-center gap-2">
                                    <img src="/gas-station.png" alt="motivo" height="20px" />
                                    <h6 className="mb-0">{g.motivo || "Gasto"}</h6>
                                    <span className="ms-auto fw-bold">${g.importe}</span>

                                </div>

                                <div className="d-flex align-items-center gap-2">
                                    <img src="/date.png" alt="fecha" height="20px"/>
                                    <small>{g.fechaGasto}</small>
                                </div>

                                <div className="d-flex align-items-start gap-2 pe-4">
                                    <img src="/note.png" alt="desc" height="20px" />
                                    <small className="textSmall flex-grow-1">
                                        {g.desc || "Sin descripción"}
                                    </small>
                                </div>
                            </div>

                            {/* Ícono eliminar abajo a la derecha con utilidades Bootstrap */}
                            <button
                                type="button"
                                className="btn btn-sm position-absolute bottom-0 end-0 m-2 d-flex align-items-center justify-content-center"
                                style={{ width: "34px", height: "34px" }}
                                onClick={() => handleEliminar(g.id)}
                                title="Eliminar gasto"
                            >
                                <img src="/delete.png" alt="del" height="18" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
