import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

export const Rentabilidad = () => {
    const [ingresos, setIngresos] = useState(0);
    const [gastos, setGastos] = useState(0);
    const [cargando, setCargando] = useState(true);

    const toNumber = (v) => {
        if (v === null || v === undefined) return 0;
        if (typeof v === "number") return v;
        // Quita símbolos, espacios, comas
        return Number(String(v).replace(/[^\d.-]/g, "")) || 0;
    };

    useEffect(() => {
        // Listener gastos
        const unsubG = onSnapshot(
            collection(db, "gastos"),
            (snap) => {
                const totalG = snap.docs.reduce(
                    (acc, d) => acc + toNumber(d.data().importe),
                    0
                );
                setGastos(totalG);
                setCargando(false);
            },
            () => setCargando(false)
        );

        // Listener traslados (ingresos)
        const unsubT = onSnapshot(
            collection(db, "traslados"),
            (snap) => {
                // Si querés excluir “pendiente” descomenta el filtro
                const totalI = snap.docs
                    //.filter(d => d.data().metodoPago !== "pendiente")
                    .reduce((acc, d) => acc + toNumber(d.data().importe), 0);
                setIngresos(totalI);
                setCargando(false);
            },
            () => setCargando(false)
        );

        return () => {
            unsubG();
            unsubT();
        };
    }, []);

    const balance = ingresos - gastos;
    const fmt = (n) => n.toLocaleString("es-UY");

    return (
        <div className="mb-2 mt-3">
            <h3 className="mb-0">Resumen de Rentabilidad</h3>
            <div className="my-3 d-flex gap-3 justify-content-around divsRentabilidad">
                <div className="d-flex flex-column text-center">
                    <h5>
                        Total{" "}
                        <img src="/graph.png" alt="graph" height="20" />
                    </h5>
                    <p className="my-3">
                        <b>{cargando ? "..." : `$${fmt(balance)}`}</b>
                    </p>
                </div>

                <div className="d-flex flex-column text-center">
                    <h5>
                        Ingreso{" "}
                        <img src="/up.png" alt="up" height="20" />
                    </h5>
                    <p className="my-3">
                        <b className="gastoColorIngreso">
                            {cargando ? "..." : `$${fmt(ingresos)}`}
                        </b>
                    </p>
                </div>

                <div className="d-flex flex-column text-center">
                    <h5>
                        Gasto{" "}
                        <img src="/down.png" alt="down" height="20" />
                    </h5>
                    <p className="my-3">
                        <b className="gastoColor">
                            {cargando ? "..." : `$${fmt(gastos)}`}
                        </b>
                    </p>
                </div>
            </div>
        </div>
    );
};
