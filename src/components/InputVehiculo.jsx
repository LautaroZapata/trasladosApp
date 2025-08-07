
export const InputVehiculo = ({ value, onChange, valueMatricula, onChangeMatricula }) => {

    const marcas = [
        'Audi',
        'BMW',
        'BYD',
        'Chery',
        'Chevrolet',
        'Citroën',
        'Fiat',
        'Ford',
        'Geely',
        'Great Wall',
        'Honda',
        'Hyundai',
        'JAC',
        'Kia',
        'Mazda',
        'Mercedes-Benz',
        'Mitsubishi',
        'Nissan',
        'Peugeot',
        'Renault',
        'Subaru',
        'Suzuki',
        'Toyota',
        'Volkswagen',
        'Volvo',
        'OTRA MARCA',
    ]
    return (
        <>
            <select name="marcaVehiculo" value={value} onChange={(e) => onChange(e.target.value)} className="form-select w-50 text-center mb-2">
                {marcas.map((marca) => (
                    <option key={marca} value={marca}>
                        {marca}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Matricula"
                className="form-control w-50 text-center"
                name="matricula"
                value={valueMatricula}
                onChange={(e) => onChangeMatricula(e.target.value)}
                required
            />
        </>
    )
}
