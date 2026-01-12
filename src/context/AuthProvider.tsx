import { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { AuthContextType, Usuario } from '../interfaces/UserInterfaces';
import SomosNaturales from '../api/somosNaturalesApi';

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [status, setStatus] = useState<'checking' | 'authenticated' | 'not-authenticated'>('checking');
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    // Efecto para persistir la sesión
    useEffect(() => {
        checkAuthToken();
    }, []);

    const checkAuthToken = async () => {
        const token = localStorage.getItem('x-token');

        // Si no hay token, no está autenticado
        if (!token) return setStatus('not-authenticated');

        try {
            // Llamada a tu backend para validar el token y obtener datos del usuario
            // Tu backend debe devolver el { usuario, token } nuevo
            const { data } = await SomosNaturales.get('/auth/renew'); 
            
            const { usuario, token: newToken } = data;
            localStorage.setItem('x-token', newToken);
            setUsuario(usuario);
            setStatus('authenticated');
        } catch (error) {
            // Si el token expiró o no es válido (validar-JWT devolvió error)
            localStorage.removeItem('x-token');
            setStatus('not-authenticated');
        }
    };

    const login = (user: Usuario, token: string) => {
        localStorage.setItem('x-token', token);
        setUsuario(user);
        setStatus('authenticated');
    };

    const logout = () => {
        localStorage.removeItem('x-token');
        setUsuario(null);
        setStatus('not-authenticated');
    };

    return (
        <AuthContext.Provider value={{ status, usuario, token: localStorage.getItem('x-token'), login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};