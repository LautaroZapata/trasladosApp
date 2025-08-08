export const ExportarTraslados = ({ traslados }) => {

    const handleExportar = () => {
        if (!traslados || traslados.length === 0) {
            alert('No hay traslados para exportar');
            return;
        }

        // Ajustá los campos según tu estructura real
        const headers = [
            'id',
            'fecha',
            'marcaVehiculo',
            'matricula',
            'localidadOrigen',
            'barrioOrigen',
            'localidadDestino',
            'barrioDestino',
            'metodoPago',
            'importe'
        ];

        const escape = (val) => {
            if (val === null || val === undefined) return '';
            const s = String(val).replace(/"/g, '""');
            return `"${s}"`;
        };

        const filas = traslados.map(t =>
            headers.map(h => escape(t[h]))
                .join(',')
        );

        const csv = [
            headers.join(','),
            ...filas
        ].join('\r\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const fecha = new Date().toISOString().slice(0, 10);
        a.href = url;
        a.download = `traslados_${fecha}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <button className="btn btn-secondary btn-sm mb-3 w-50 text-center mx-auto" onClick={handleExportar}>
            ⬇️ Exportar CSV
        </button>
    );
};