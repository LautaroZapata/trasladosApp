import { useState } from "react";
import { validarMatricula } from "../utils/validacionMatricula";


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

    const [esMatriculaValida, setEsMatriculaValida] = useState(true);

    const handleCambioMatricula = (valor) => {
        onChangeMatricula(valor.toUpperCase());

        // Validar solo si tiene algo escrito
        if (valor.length > 0) {
            setEsMatriculaValida(validarMatricula(valor));
        } else {
            setEsMatriculaValida(true); // No mostrar error si está vacío
        }
    };


    return (
        <>
            {/* Select con icono */}
            <div className="select-with-icon select-custom-arrow w-75 mb-2">
                <span className="select-leading-icon"><img src="../../public/car.png" alt="wheel" height="25px" className="icons my-auto"/></span>
                <select
                    name="marcaVehiculo"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="form-select text-center texts w-100 p-2"
                >
                    {marcas.map((marca) => (
                        <option key={marca} value={marca}>
                            {marca}
                        </option>
                    ))}
                </select>
            </div>

            <input
                type="text"
                placeholder="Matrícula (ABC1234)"
                className={`form-control texts w-75 text-center ${esMatriculaValida ? '' : 'is-invalid'}`}
                name="matricula"
                value={valueMatricula}
                onChange={(e) => handleCambioMatricula(e.target.value)}
                maxLength="7"
                required
            />

            {!esMatriculaValida && (
                <div className="invalid-feedback d-block text-center texts">
                    Formato: 3 letras + 4 números (ej: ABC1234)
                </div>
            )}
        </>
    )
}
