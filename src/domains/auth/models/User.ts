export interface User {
    id_usuarios: number | null;
    correo_electronico: string;
    nombre_completo: string;
    password: string;
    id_rol: number;
    id_estados: number;
    telefono: number;
    fecha_nacimiento: string;
    id_clientes: number | null;
}