import React from "react";
import VistaItem from "./VistaItem";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const ListadoItems = () => {

 const { selectedCategory,isLoading } = useSelector((state: RootState) => state);

 if (isLoading) return <div>Cargando items...</div>

    return(
      <div>
        <h4>Items</h4>
        {selectedCategory.items.map((item) => <VistaItem key={item.name} item={item} />)}
      </div>
    ) 
}

export default ListadoItems;
