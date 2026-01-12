import axios from 'axios';

const SomosNaturales = axios.create({
    baseURL: 'http://localhost:8080/api' // Cambia por tu URL de Node
});

// Interceptor para añadir el token (el que tu middleware validar-JWT.js leerá)
SomosNaturales.interceptors.request.use( config => {
    const token = localStorage.getItem('x-token');
    if ( token ) {
        config.headers['x-token'] = token;
    }
    return config;
});

export default SomosNaturales;