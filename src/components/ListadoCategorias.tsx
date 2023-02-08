import React, { useEffect } from "react";
import { fetchCategoriesPending } from "../redux/slice";
import ListadoCategoriasItem from "./ListadoCategoriasItem";
import { Categories } from "../types/category.types";
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch,RootState } from "../redux/store";

const ListadoCategorias = () => {

    const { isLoading, categories } = useSelector((state: RootState) => state);
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
     dispatch(fetchCategoriesPending());
    }, [])
    
    if (isLoading) return <div>Cargando categorias...</div>

    return (
      <div id="listadoCategorias">
        {categories &&
          categories?.map((categoria: Categories) => (
            <ListadoCategoriasItem categories={categoria} />
          ))}
      </div>
    );
}

export default ListadoCategorias;
