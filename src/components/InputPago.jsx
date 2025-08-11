export const InputPago = ({ valuePago, valueImporte, onChangePago, onChangeImporte }) => {
    return (
        <>
            {/* Select método de pago con un único icono */}
            <div className="select-with-icon select-custom-arrow w-75 mt-3 mb-2">
                <span className="select-leading-icon">
                    <img src="/dollar.png" alt="dollar" className="icon-img" />
                </span>
                <select
                    name="opcionPago"
                    className="form-select w-100 text-center texts"
                    required
                    value={valuePago}
                    onChange={(e) => onChangePago(e.target.value)}
                >
                    <option value="pendiente">Pago pendiente</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="credito">Crédito</option>
                    <option value="transferencia">Transferencia</option>
                </select>
            </div>

            <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                className="form-control w-75 text-center mt-1 texts"
                placeholder="Monto"
                required
                value={valueImporte}
                onChange={(e) => onChangeImporte(e.target.value)}
            />
        </>
    )
}
