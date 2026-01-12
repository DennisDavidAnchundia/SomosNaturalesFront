export interface Producto {
    _id: string;
    nombre: string;
    descripcion?: string; // Opcional según tu Schema
    precio: number;
    imagen: string;
    disponibilidad: boolean;
    // Campos de popularidad que vienen de tu Schema
    ventasTotales: number;
    ratingPromedio: number;
    numRevisiones: number;
    usuariosQueCalificaron: string[];
}

export interface ProductoResponse {
    ok: boolean;
    productos: Producto[];
}