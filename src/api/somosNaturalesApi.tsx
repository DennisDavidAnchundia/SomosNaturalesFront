import axios from 'axios';

const SomosNaturales = axios.create({
    baseURL: 'https://somosnaturalesback.onrender.com/api' 
});

// Interceptor para añadir el token
SomosNaturales.interceptors.request.use( config => {
    const token = localStorage.getItem('x-token');
    if ( token ) {
        config.headers['x-token'] = token;
    }
    return config;
});

export default SomosNaturales;