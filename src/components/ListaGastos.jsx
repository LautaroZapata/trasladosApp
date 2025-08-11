import { useEffect, useRef, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

export const ListaGastos = () => {
    const [gastos, setGastos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const contRef = useRef(null);

    useEffect(() => {
        const colRef = collection(db, "gastos");
        const unsub = onSnapshot(
            colRef,
            (snap) => {
                let arr = snap.docs.map((d) => {
                    const data = d.data();
                    const epoch = data.fechaGastoEpoch ??
                        (() => {
                            if (!data.fechaGasto) return 0;
                            const [dd, mm, yyyy] = data.fechaGasto.split(/[\/\-]/).map(Number);
                            return new Date(yyyy, mm - 1, dd).getTime();
                        })();
                    return {
                        id: d.id,
                        ...data,
                        _epoch: epoch
                    };
                });
                // Descendente (más nuevo primero a la IZQUIERDA)
                arr.sort((a, b) => b._epoch - a._epoch);
                arr = arr.slice(0, 3);
                setGastos(arr);
                setCargando(false);
            },
            (err) => {
                console.error("onSnapshot gastos:", err);
                setCargando(false);
            }
        );
        return () => unsub();
    }, []);

    // Resetear scroll al inicio para mostrar siempre el más nuevo
    useEffect(() => {
        if (contRef.current) {
            contRef.current.scrollTo({ left: 0 });
        }
    }, [gastos]);

    if (cargando) {
        return (
            <div className="gastosWrapper">
                <p className="textSmall text-center">Cargando gastos...</p>
                <div className="mb-2">
                    <h3 className="mb-0">Resumen de Rentabilidad</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="gastosWrapper">
            <div className="mb-2">
                <h3 className="mb-0">Últimos Gastos</h3>
                {gastos.length > 0
                    ? <p className="textSmall mb-0">Mostrando {gastos.length} recientes</p>
                    : <p className="textSmall text-center my-5">Sin gastos registrados.</p>}
            </div>

            {gastos.length > 0 && (
                <div className="gastosCarousel" ref={contRef}>
                    {gastos.map(g => (
                        <div className="gastoCard" key={g.id}>
                            <div className="d-flex align-items-center gap-2 mb-2">
                                <img src="/gas-station.png" alt="motivo" height="20" className="iconOrange" />
                                <h5 className="mb-0">{g.motivo || "Gasto"}</h5>
                            </div>
                            <div className="d-flex align-items-center gap-2 mb-2">
                                <img src="/date.png" alt="fecha" height="20" className="iconOrange" />
                                <span>{g.fechaGasto}</span>
                                <span className="ms-auto fw-bold">${g.importe}</span>
                            </div>
                            <div className="d-flex align-items-start gap-2">
                                <img src="/note.png" alt="desc" height="20" className="iconOrange" />
                                <span className="textSmall">{g.desc || "Sin descripción"}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
