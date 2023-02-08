import React from "react";
import ListadoItems from "./ListadoItems";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const VistaCategoria = () => {

    const { selectedCategory  } = useSelector((state:RootState) => state);
    const { name } = selectedCategory;
    
    return name ? (
      <div id="vistaCategoria">
        <h3 className="titulo">Categoria: {name}</h3>
        <ListadoItems />
      </div>
    ):null;
};

export default VistaCategoria;
