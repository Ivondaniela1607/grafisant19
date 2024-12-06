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