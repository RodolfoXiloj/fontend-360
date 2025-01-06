export interface User {
    id_usuarios: number | null;
    nombre_completo: string;
    correo_electronico: string;
    password: string;
    telefono?: string;
    fecha_nacimiento?: string;
    fecha_creacion?: string;
    id_rol: number;
    id_estados: number;
    id_clientes?: number | null;
}
