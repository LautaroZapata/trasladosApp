import { FormularioGasto } from "./FormularioGasto"
import { ListaGastos } from "./ListaGastos"
import { Rentabilidad } from "./Rentabilidad"


export const Gastos = () => {
    return (
        <>
            <div className="container mt-4">
                <FormularioGasto />
            </div>
            <div className="container mt-4">
                <ListaGastos />
            </div>
            <div className="container mt-4">
                <Rentabilidad />
            </div>
        </>
    )
}
