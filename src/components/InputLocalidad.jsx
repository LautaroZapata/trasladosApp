export const InputLocalidad = ({ valueOrigen, valueDestino, valueBarrio ,onChangeOrigen, onChangeDestino, onChangeBarrio }) => {

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
                className="form-select w-50 text-center mt-2"
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

            <select
                name="localidadDestino"
                className="form-select w-50 text-center mt-2"
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
                placeholder="Barrio"
                className="form-control w-50 text-center mt-2"
                required
                value={valueBarrio}
                onChange={(e) => onChangeBarrio(e.target.value)}
            />
        </>
    )
}
