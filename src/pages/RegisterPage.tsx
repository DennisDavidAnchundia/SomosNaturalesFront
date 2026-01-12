import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import SomosNaturales from '../api/somosNaturalesApi';
import { GoogleLogin } from '../components/ui/GoogleSign';

export const RegisterPage = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        password: ''
    });

    const { nombre, correo, password } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const resp = await SomosNaturales.post('/register/registerConsumer', { nombre, correo, password });
            const { usuario, token } = resp.data;

            login(usuario, token);
            // Redirigimos a home directamente si ya lo logueamos, o a login
            navigate('/login');

        } catch (error: any) {
            console.log(error.response?.data);
            alert(error.response?.data?.msg || 'Error al registrarse');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-600 via-green-500 to-yellow-500 px-4">
            
            {/* --- ESTADO DE CARGA (Hamburguesa Giratoria) --- */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center animate-fadeIn">
                    <div className="text-8xl animate-bounce mb-4 drop-shadow-2xl">
                        <div className="animate-spin-slow">🍔</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 shadow-xl">
                        <p className="text-white font-black uppercase tracking-widest text-lg animate-pulse">
                            Preparando tu cuenta...
                        </p>
                    </div>
                </div>
            ) : (
                /* --- FORMULARIO DE REGISTRO --- */
                <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden transform transition-all hover:scale-[1.01]">
                    <div className="p-8 md:p-10">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl shadow-inner mb-4">
                                🥗
                            </div>
                            <h1 className="text-3xl font-black text-gray-800 uppercase italic tracking-tighter">
                                Crear <span className="text-green-600">Cuenta</span>
                            </h1>
                            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1 text-center">
                                Únete a nuestra comunidad natural
                            </p>
                        </div>

                        <form onSubmit={onRegister} className="space-y-4">
                            {/* Input Nombre */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Nombre Completo</label>
                                <input 
                                    className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-green-400 focus:bg-white rounded-2xl outline-none transition-all font-medium text-gray-700 shadow-sm"
                                    type="text" 
                                    placeholder="Ej. Juan Pérez" 
                                    name="nombre" 
                                    value={nombre} 
                                    onChange={onChange} 
                                    required 
                                />
                            </div>

                            {/* Input Correo */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Correo Electrónico</label>
                                <input 
                                    className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-green-400 focus:bg-white rounded-2xl outline-none transition-all font-medium text-gray-700 shadow-sm"
                                    type="email" 
                                    placeholder="tu@correo.com" 
                                    name="correo" 
                                    value={correo} 
                                    onChange={onChange} 
                                    required 
                                />
                            </div>

                            {/* Input Password */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Contraseña</label>
                                <input 
                                    className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-green-400 focus:bg-white rounded-2xl outline-none transition-all font-medium text-gray-700 shadow-sm"
                                    type="password" 
                                    placeholder="••••••••" 
                                    name="password" 
                                    value={password} 
                                    onChange={onChange} 
                                    required 
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-green-200 transform active:scale-95 transition-all uppercase tracking-widest mt-4"
                            >
                                Registrarse
                            </button>
                        </form>

                        <GoogleLogin/>
                        <div className="mt-6 text-center">
                            <p className="text-gray-500 text-xs font-bold uppercase">
                                ¿Ya tienes cuenta?{' '}
                                <Link to="/login" className="text-green-600 hover:text-green-700 underline decoration-2 underline-offset-4">
                                    Ingresa aquí
                                </Link>
                            </p>
                        </div>
                    </div>
                    
                    {/* Barra de colores decorativa */}
                    <div className="h-2 w-full flex">
                        <div className="h-full w-1/3 bg-green-600"></div>
                        <div className="h-full w-1/3 bg-yellow-400"></div>
                        <div className="h-full w-1/3 bg-red-500"></div>
                    </div>
                </div>
            )}
        </div>
    );
};