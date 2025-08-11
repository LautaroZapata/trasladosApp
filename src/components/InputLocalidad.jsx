export const InputLocalidad = ({ valueOrigen, valueDestino, valueBarrioOrigen, valueBarrioDestino, onChangeOrigen, onChangeDestino, onChangeBarrioOrigen, onChangeBarrioDestino }) => {

    const departamentos = [
        'Artigas', 'Canelones', 'Cerro Largo', 'Colonia',
        'Durazno', 'Flores', 'Florida', 'Lavalleja',
        'Maldonado', 'Montevideo', 'Paysandú', 'Río Negro',
        'Rivera', 'Rocha', 'Salto', 'San José',
        'Soriano', 'Tacuarembó', 'Treinta y Tres'
    ]

    return (
        <>
            <select
                name="localidadOrigen"
                className="form-select w-75 text-center mt-3 texts"
                value={valueOrigen}
                onChange={(e) => onChangeOrigen(e.target.value)}
                required
            >
                {departamentos.map(departamento => (
                    <option key={departamento} value={departamento}>
                        {departamento}
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Barrio Origen"
                className="form-control w-75 text-center  texts"
                required
                value={valueBarrioOrigen}
                onChange={(e) => onChangeBarrioOrigen(e.target.value)}
            />

            <select
                name="localidadDestino"
                className="form-select w-75 text-center mt-4 texts"
                value={valueDestino}                                   
                onChange={(e) => onChangeDestino(e.target.value)}      
                required
            >

                {departamentos.map(departamento => (
                    <option key={departamento} value={departamento}>
                        {departamento}
                    </option>
                ))}
            </select>

            

            <input
                type="text"
                placeholder="Barrio Destino"
                className="form-control w-75 text-center  texts"
                required
                value={valueBarrioDestino}
                onChange={(e) => onChangeBarrioDestino(e.target.value)}
            />
        </>
    )
}
