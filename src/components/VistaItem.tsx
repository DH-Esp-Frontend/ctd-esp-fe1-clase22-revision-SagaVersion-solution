import React from "react";

const VistaItem = (item:{ item:{ name:string, url:string } }) => {
const { name,url }= item.item;

  return (
    <div >
      <h4>Item: { name }</h4>
      <img src={ url } />
    </div>
  );
}

export default VistaItem;
