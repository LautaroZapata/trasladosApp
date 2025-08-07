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
            <select name="marcaVehiculo" value={value} onChange={(e) => onChange(e.target.value)} className="form-select w-50 text-center mb-2 texts">
                {marcas.map((marca) => (
                    <option key={marca} value={marca}>
                        {marca}
                    </option>
                ))}
            </select>
            
            <input
                type="text"
                placeholder="Matrícula (ABC1234)"
                className={`form-control texts w-50 text-center ${esMatriculaValida ? '' : 'is-invalid'}`}
                name="matricula"
                value={valueMatricula}
                onChange={(e) => handleCambioMatricula(e.target.value)}
                maxLength="7"  // Limitar a 7 caracteres
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
