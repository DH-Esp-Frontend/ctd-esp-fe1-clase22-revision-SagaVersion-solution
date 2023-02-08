import React from "react";
import PropTypes from "prop-types";
import { selectCategory } from "../redux/slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

interface ListadoCategoriasItemProps {
    name:string,
    url:string
}

const ListadoCategoriasItem = ( categories: {categories:ListadoCategoriasItemProps} ) => {
  const { name, url } = categories.categories;
  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <div onClick={() => dispatch(selectCategory( url ))}>
        <strong>{ name }</strong>
        <small> { url }</small>
      </div>
    </>
  );
};

ListadoCategoriasItem.propTypes = {
  categories: {
    categories: PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  },
};

export default ListadoCategoriasItem;
