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
            {/* ORIGEN */}
            <div className="select-with-icon select-custom-arrow w-75 mt-3 mb-2">
                <span className="select-leading-icon">
                    <img src="/location.png" alt="" className="icon-img" />
                </span>
                <select
                    name="localidadOrigen"
                    className="form-select w-100 text-center texts"
                    value={valueOrigen}
                    onChange={(e) => onChangeOrigen(e.target.value)}
                    required
                >
                    {departamentos.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </div>

            <input
                type="text"
                placeholder="Barrio Origen"
                className="form-control w-75 text-center texts mb-3"
                required
                value={valueBarrioOrigen}
                onChange={(e) => onChangeBarrioOrigen(e.target.value)}
            />

            {/* DESTINO */}
            <div className="select-with-icon select-custom-arrow w-75 mt-2 mb-2">
                <span className="select-leading-icon">
                    <img src="/location.png" alt="location" className="icon-img" />
                </span>
                <select
                    name="localidadDestino"
                    className="form-select w-100 text-center texts"
                    value={valueDestino}
                    onChange={(e) => onChangeDestino(e.target.value)}
                    required
                >
                    {departamentos.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </div>

            <input
                type="text"
                placeholder="Barrio Destino"
                className="form-control w-75 text-center texts"
                required
                value={valueBarrioDestino}
                onChange={(e) => onChangeBarrioDestino(e.target.value)}
            />
        </>
    )
}
