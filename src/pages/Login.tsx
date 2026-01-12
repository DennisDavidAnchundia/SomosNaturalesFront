import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import SomosNaturales from '../api/somosNaturalesApi';
import { GoogleLogin } from '../components/ui/GoogleSign';

export const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const resp = await SomosNaturales.post('/auth/login', { correo: email, password });
            const { usuario, token } = resp.data;

            login(usuario, token);

            if (usuario.rol === 'ADMIN_ROLE') navigate('/admin');
            else if (usuario.rol === 'WORKER_ROLE') navigate('/worker');
            else navigate('/home');

        } catch (error) {
            console.log("Error en login", error);
            alert('Credenciales incorrectas');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-red-600 via-red-500 to-yellow-500 px-4">
            
            {/* --- ESTADO DE CARGA --- */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center animate-fadeIn">
                    <div className="text-8xl animate-bounce mb-4 drop-shadow-2xl">
                        <div className="animate-spin-slow">🍔</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 shadow-xl">
                        <p className="text-white font-black uppercase tracking-widest text-lg animate-pulse">
                            Cargando...
                        </p>
                    </div>
                </div>
            ) : (
                /* --- FORMULARIO DE LOGIN --- */
                <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden transform transition-all hover:scale-[1.01]">
                    <div className="p-8 md:p-12">
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-4xl shadow-inner mb-4">
                                👨‍🍳
                            </div>
                            <h1 className="text-3xl font-black text-gray-800 uppercase italic tracking-tighter">
                                Somos <span className="text-red-600">Naturales</span>
                            </h1>
                            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">
                                ¡Bienvenido a la cocina!
                            </p>
                        </div>

                        <form onSubmit={onLogin} className="space-y-5">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Correo Electrónico</label>
                                <input 
                                    type="email" 
                                    placeholder="chef@somosnatural.com" 
                                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-yellow-400 focus:bg-white rounded-2xl outline-none transition-all font-medium text-gray-700 shadow-sm"
                                    required 
                                    onChange={e => setEmail(e.target.value)} 
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Contraseña</label>
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-yellow-400 focus:bg-white rounded-2xl outline-none transition-all font-medium text-gray-700 shadow-sm"
                                    required 
                                    onChange={e => setPassword(e.target.value)} 
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-red-200 transform active:scale-95 transition-all uppercase tracking-widest mt-4"
                            >
                                ¡A comer!
                            </button>
                        </form>

                        <GoogleLogin/>
                        <div className="mt-8 text-center">
                            <button className="text-gray-400 text-xs font-bold hover:text-red-600 transition-colors uppercase">
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>
                    </div>
                    
                    {/* Decoración Inferior */}
                    <div className="h-2 bg-yellow-400 w-full flex">
                        <div className="h-full w-1/3 bg-green-500"></div>
                        <div className="h-full w-1/3 bg-red-600"></div>
                        <div className="h-full w-1/3 bg-yellow-400"></div>
                    </div>
                </div>
            )}
        </div>
    );
};