
export const InputPago = ({ valuePago, valueImporte, onChangePago, onChangeImporte }) => {
    return (
        <>
            <select name="opcionPago" className="form-select w-50 text-center mt-5" required value={valuePago} onChange={(e) => onChangePago(e.target.value)}>
                <option defaultChecked value="pendiente">Pago pendiente</option>
                <option value="efectivo">Efectivo</option>
                <option value="credito">Crédito</option>
                <option value="transferencia">Transferencia</option>
            </select>
            <input 
                type="number" 
                className="form-control w-50 text-center mt-2"
                placeholder="Monto"
                required
                value={valueImporte}
                onChange={(e) => onChangeImporte(e.target.value)}
            />
        </>
    )
}
