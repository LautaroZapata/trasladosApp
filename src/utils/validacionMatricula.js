export const validarMatricula = (matricula) => {
        if (matricula.length !== 7) return false;
        
        const letras = matricula.slice(0, 3);  // Primeros 3 caracteres
        const numeros = matricula.slice(3);    // Últimos 4 caracteres
        
        // Verificar que los primeros 3 sean letras
        const sonLetras = /^[A-Z]{3}$/i.test(letras);
        
        // Verificar que los últimos 4 sean números
        const sonNumeros = /^[0-9]{4}$/.test(numeros);
        
        return sonLetras && sonNumeros;
    };