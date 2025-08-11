import { useState, useRef } from "react";
import { registrarGastoEnBdd } from "../utils/registrarGasto";

export const FormularioGasto = () => {
    const hoyISO = () => new Date().toISOString().slice(0, 10); // yyyy-mm-dd
    const isoToDisplay = (iso) => {
        const [y, m, d] = iso.split("-");
        return `${d}/${m}/${y}`;
    };

    const [formulario, setFormulario] = useState({
        motivo: "Otro",
        importe: "",
        desc: "",
        fechaGasto: hoyISO(), // valor para el input date (ISO)
    });
    const [loading, setLoading] = useState(false);
    const [notificacion, setNotificacion] = useState("");

    const dateInputRef = useRef(null);

    const abrirDatePicker = () => {
        const el = dateInputRef.current;
        if (!el) return;
        // showPicker soportado en navegadores Chromium y Safari nuevos
        if (el.showPicker) {
            el.showPicker();
        } else {
            // Fallback (Firefox normalmente no abre el diálogo con click programático,
            // pero al menos enfoca el input)
            el.focus();
            el.click();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formulario.importe) {
            setNotificacion("Ingresá un importe.");
            setTimeout(() => setNotificacion(""), 3000);
            setLoading(false);
            return;
        }

        try {
            const fechaDisplay = isoToDisplay(formulario.fechaGasto); // dd/mm/yyyy
            const epoch = Date.parse(formulario.fechaGasto); // yyyy-mm-dd -> ms
            await registrarGastoEnBdd({
                motivo: formulario.motivo,
                importe: formulario.importe,
                desc: formulario.desc,
                fechaGasto: fechaDisplay,
                fechaGastoEpoch: epoch
            });
            setFormulario({
                motivo: "Otro",
                importe: "",
                desc: "",
                fechaGasto: hoyISO(),
            });
            setNotificacion("¡Gasto registrado!");
        } catch (err) {
            console.error(err);
            setNotificacion("Error al registrar el gasto.");
        } finally {
            setLoading(false);
            setTimeout(() => setNotificacion(""), 3000);
        }
    };

    return (
        <>
            <h3>Registrar Gasto</h3>
            <form
                onSubmit={handleSubmit}
                className="d-flex flex-column align-items-center "
            >
                <div className="d-flex flex-column gap-2 container">
                    <div className="input-icon">
                        <img
                            src="/date.png"
                            alt="Seleccionar fecha"
                            className="input-icon__img clickable"
                            onClick={abrirDatePicker}
                        />
                        <input
                            id="fechaGasto"
                            ref={dateInputRef}
                            type="date"
                            className="texts form-control"
                            value={formulario.fechaGasto}
                            onChange={(e) => setFormulario({ ...formulario, fechaGasto: e.target.value })}
                            required
                        />
                    </div>
                    <div className="input-icon">
                        <img src="/gas-station.png" alt="gas" className="input-icon__img" />
                        <select
                            className="texts form-select"
                            value={formulario.motivo}
                            onChange={(e) =>
                                setFormulario({ ...formulario, motivo: e.target.value })
                            }
                            required
                        >
                            <option value="Combustible">Combustible</option>
                            <option value="Mantenimiento">Mantenimiento</option>
                            <option value="Seguro">Seguro</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>

                    <div className="input-icon">
                        <img src="/dollar.png" alt="importe" className="input-icon__img" />
                        <input
                            className="texts form-control"
                            type="number"
                            placeholder="Importe"
                            value={formulario.importe}
                            onChange={(e) =>
                                setFormulario({ ...formulario, importe: e.target.value })
                            }
                            required
                        />
                    </div>

                    <div className="input-icon">
                        <img src="/note.png" alt="desc" className="input-icon__img" />
                        <textarea
                            className="texts form-control textarea-fija "
                            placeholder="Descripción"
                            value={formulario.desc}
                            onChange={(e) =>
                                setFormulario({ ...formulario, desc: e.target.value })
                            }
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-5 w-100">
                    <button
                        type="submit"
                        className="btn btn-primary texts p-1 w-75"
                        disabled={loading}
                    >
                        {loading ? "Registrando..." : "Registrar Gasto"}
                    </button>
                </div>

                {loading && (
                    <div className="traslados-loading-overlay">
                        <div className="traslados-loading-popup">
                            <span
                                className="spinner-border"
                                role="status"
                                aria-hidden="true"
                                style={{ width: "3rem", height: "3rem" }}
                            ></span>
                            <span className="traslados-loading-text">
                                Procesando registro...
                            </span>
                        </div>
                    </div>
                )}

                {notificacion && (
                    <div className="traslados-notificacion">{notificacion}</div>
                )}
            </form>
        </>
    );
};
