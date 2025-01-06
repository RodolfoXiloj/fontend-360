export interface Product {
    id_productos: number | null;
    id_categoria_productos: number;
    id_usuarios: number | null;
    nombre: string;
    marca: string | null;
    codigo: string | null;
    stock: number;
    id_estados: number;
    precio: number;
    fecha_creacion: string;
    foto: File | string | null;
  }
  