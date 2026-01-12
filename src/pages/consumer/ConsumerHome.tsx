import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { HomePage } from '../HomePage';
interface Producto {
    id: string;
    titulo: string;
    descripcion: string;
    imagen: string;
    popularidad: number;
}
export const ConsumerHome = () => {
    const { usuario, logout } = useContext(AuthContext);
 const [productos, setProductos] = useState<Producto[]>([]);
    const navigate = useNavigate();
    return (
        <>
            <HomePage/>
        </>
    );
};