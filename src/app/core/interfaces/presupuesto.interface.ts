export interface ICategoria {
  id_categoria: number;
  categoria: string;
}

export interface ISubcategoria {
  id_categoria: number;
  id_subcategoria: number;
  nombre_subcategoria: string;

}
export interface IPresupuesto {
  cantidad: number;
  categoria: ICategoria;
  subcategoria: ISubcategoria;
}
export interface ICliente {
  id_img: number;
  img: string;
}
export interface IListOrders{
  apellido: string;
  cliente: string;
  codigo: string;
  descripcion_presupuesto: string;
  documento: string;
  email: string;
  estado: string;
  fecha_solicitud: string;
  file: IFile;
  id_presupuesto: string;
  id_usuario: number;
  img: string;
  listCategoris: IListategoria[];
  fecha_cancelacion: string;
  fecha_creacion: string;
  fecha_estimada: string;
  fecha_real: string;
  percentage: string;
}

export interface IFile {
  fecha_actualizado: string;
  fecha_creado: string;
  id_documento_presupuesto: number;
  id_presupuesto: number;
  nombre_archivo: string;
  nombre_original: string;
  ruta: string;
}

export interface IListategoria {
  cantidad: number;
  categoria: string;
  id_categoria: number;
  id_subcategoria: number;
  nombre_subcategoria: string;
}
