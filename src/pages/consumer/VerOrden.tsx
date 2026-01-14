import { useEffect, useState } from 'react';
import SomosNaturales from '../../api/somosNaturalesApi';
import { IoReceiptOutline, IoTimeOutline, IoCheckmarkCircle, IoFastFoodOutline, IoBicycleOutline } from "react-icons/io5";
import { RatingInput } from './RatingInput';

export const MisPedidos = () => {
    const [pedidos, setPedidos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const cargarPedidos = async () => {
        try {
            const { data } = await SomosNaturales.get('/orden/mis-pedidos');
            setPedidos(data.ordenes);
        } catch (error) {
            console.error('Error al cargar pedidos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarPedidos();
        const interval = setInterval(cargarPedidos, 30000);
        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDIENTE': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'EN_PREPARACION': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'LISTO': return 'bg-green-100 text-green-700 border-green-200';
            case 'ENTREGADO': return 'bg-gray-100 text-gray-700 border-gray-200';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin-slow text-6xl">🥗</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-20 pt-10 px-4">
            <div className="max-w-4xl mx-auto">

                {/* Header de la sección */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="bg-red-600 p-3 rounded-2xl shadow-lg shadow-red-200 text-white">
                        <IoReceiptOutline size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-gray-800 uppercase italic tracking-tighter">
                            Mis <span className="text-red-600">Pedidos</span>
                        </h1>
                        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                            Historial y seguimiento en tiempo real
                        </p>
                    </div>
                </div>

                {pedidos.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] p-12 text-center shadow-xl shadow-gray-200/50 border border-gray-100">
                        <div className="text-6xl mb-4">🍽️</div>
                        <h3 className="font-black text-gray-800 uppercase tracking-tight">¿Tienes hambre?</h3>
                        <p className="text-gray-400 text-sm font-bold uppercase mt-2">Aún no has realizado ningún pedido.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {pedidos.map(pedido => (
                            <div key={pedido._id} className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden transform transition-all hover:scale-[1.01]">
                                {pedido.estado === 'ENTREGADO' && (
                                    <div className="mt-8">
                                        {/* Título de la sección con estilo de marca */}
                                        <h3 className="text-xl font-black text-gray-800 uppercase italic tracking-tighter mb-6 flex items-center gap-2">
                                            <span className="bg-orange-500 w-2 h-6 rounded-full"></span>
                                            ¿Qué te pareció tu comida?
                                        </h3>

                                        <div className="grid gap-4">
                                            {pedido.productos.map((item: any) => (
                                                <div
                                                    key={item.producto._id}
                                                    className="group flex flex-col md:flex-row md:items-center justify-between p-5 bg-white rounded-[2rem] border-2 border-gray-50 shadow-sm hover:shadow-md hover:border-orange-100 transition-all duration-300"
                                                >
                                                    {/* Nombre del Producto con estilo fuerte */}
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1 italic">
                                                            Producto para evaluar:
                                                        </span>
                                                        <span className="text-lg font-black text-gray-800 uppercase italic tracking-tighter group-hover:text-orange-600 transition-colors">
                                                            {item.producto.nombre}
                                                        </span>
                                                    </div>

                                                    {/* Separador visual para móvil */}
                                                    <div className="h-px w-full bg-gray-100 my-3 md:hidden"></div>

                                                    {/* Input de Estrellas */}
                                                    <div className="bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 group-hover:bg-orange-50 transition-colors">
                                                        <RatingInput producto={item.producto} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {/* Header del Pedido */}
                                <div className="p-6 border-b border-gray-50 flex flex-wrap justify-between items-center gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="text-gray-400"><IoTimeOutline size={20} /></div>
                                        <span className="font-black text-gray-800 text-sm uppercase">
                                            {new Date(pedido.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase border-2 ${getStatusColor(pedido.estado)}`}>
                                        {pedido.estado.replace('_', ' ')}
                                    </span>
                                </div>

                                {/* Cuerpo: Productos */}
                                <div className="p-6 md:p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tu Banquete</p>
                                            {pedido.productos.map((item: any, index: number) => (
                                                <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl">
                                                    <span className="text-sm font-bold text-gray-700">
                                                        <span className="text-red-600 font-black mr-2">{item.cantidad}x</span>
                                                        {item.producto.nombre}
                                                    </span>
                                                    <span className="text-sm font-black text-gray-800">${(item.precio * item.cantidad).toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="bg-yellow-50 rounded-[2rem] p-6 flex flex-col justify-center">
                                            <p className="text-[10px] font-black text-yellow-700 uppercase tracking-widest mb-2 text-center">Resumen de Pago</p>
                                            <div className="flex justify-between items-center text-2xl font-black text-gray-800 tracking-tighter">
                                                <span>TOTAL:</span>
                                                <span className="text-green-600">${pedido.total.toFixed(2)}</span>
                                            </div>
                                            <p className="text-center text-[10px] font-bold text-yellow-600 uppercase mt-2 italic">
                                                Método: {pedido.metodoPago}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Barra de progreso visual (Stepper) */}
                                    <div className="mt-10 pt-6 border-t border-gray-100">
                                        <div className="flex justify-between relative">
                                            {/* Línea de fondo */}
                                            <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 -z-0"></div>

                                            <StepItem
                                                icon={<IoReceiptOutline />}
                                                label="Recibido"
                                                active={['PENDIENTE', 'EN_PREPARACION', 'LISTO', 'ENTREGADO'].includes(pedido.estado)}
                                            />
                                            <StepItem
                                                icon={<IoFastFoodOutline />}
                                                label="En Cocina"
                                                active={['EN_PREPARACION', 'LISTO', 'ENTREGADO'].includes(pedido.estado)}
                                            />
                                            <StepItem
                                                icon={<IoCheckmarkCircle />}
                                                label="¡Listo!"
                                                active={['LISTO', 'ENTREGADO'].includes(pedido.estado)}
                                            />
                                            <StepItem
                                                icon={<IoBicycleOutline />}
                                                label="Entregado"
                                                active={['ENTREGADO'].includes(pedido.estado)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Subcomponente para los pasos del stepper
const StepItem = ({ icon, label, active }: { icon: any, label: string, active: boolean }) => (
    <div className="flex flex-col items-center relative z-10 w-1/4 text-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all duration-500 shadow-md ${active ? 'bg-red-600 text-white scale-110 shadow-red-200' : 'bg-white text-gray-300 border-2 border-gray-100'}`}>
            {icon}
        </div>
        <span className={`text-[9px] font-black uppercase mt-3 tracking-tighter ${active ? 'text-red-600' : 'text-gray-300'}`}>
            {label}
        </span>
    </div>
);