
export const InputVehiculo = ({value, onChange}) => {
    return (
        <>
            <input
                type="text"
                placeholder="Vehiculo"
                className="form-control w-50 text-center"
                name="vehiculo"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
            />
        </>
    )
}
