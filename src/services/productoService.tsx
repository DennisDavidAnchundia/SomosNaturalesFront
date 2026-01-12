import axios from 'axios';

const URL_API = 'http://localhost:8080/api/producto/traerProducto';

export const obtenerProductos = async () => {
    const token = localStorage.getItem('x-token'); // Obtenemos el token guardado
    
    try {
        const resp = await axios.get(URL_API, {
            headers: {
                'x-token': token
            }
        });
        return resp.data.productos; // Asumiendo que tu backend devuelve { productos: [...] }
    } catch (error) {
        console.error('Error al traer productos', error);
        return [];
    }
};