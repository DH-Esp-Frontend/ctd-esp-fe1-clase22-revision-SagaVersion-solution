import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {fetchAndFormatData} from "../utils/utils";
import { Categories, Category } from "../types/category.types";
import { put, call, takeEvery } from "redux-saga/effects";

function* fetchCategoriesSaga() {
  try {
    yield put(selectCategoryPending());
    const response: Categories[] = yield call(() =>
      fetch("https://pokeapi.co/api/v2/item-category/").then((res) => res.json()));
    const { results } = yield response;
    yield put({ type: "pokemon/fetchCategoriesSagas", payload: results });
  } catch (error) {
    yield put(fetchCategoriesFailed());
  }
}




/**
 * selectedCategorySaga maneja la selección de categorías.
 * @param {object} action - Acción que contiene el payload con la URL de la categoría a seleccionar.
 * @returns {IterableIterator<PutEffect<{type, payload}> | CallEffect<() => Promise<Category>> }
 */
function* selectedCategorySaga(action: any) {
  try {
    /**
     * Respuesta de la categoría seleccionada en formato JSON.
     * @typedef {object} Category
     * @property {Array} items - Arreglo de objetos que representan los items de la categoría.
     * @property {string} name - Nombre de la categoría.
     */
    const responseCategory: Category = yield call(() =>fetch(`${action.payload}`).then((res) => res.json()));
    const { items: arrayItems, name } = responseCategory;

    /*Array de URLs de los items de la categoría seleccionada.*/
    const allURL: string[] = yield call(() => arrayItems.map((item) => item.url));

    /*Resultado formateado de los items de la categoría seleccionada.*/
    const formatItemsResult: Category = yield call(() => fetchAndFormatData(allURL));

    /*Categoría con el nombre y los items formateados.*/
    const categoryFormated = { name, items: formatItemsResult };

    /*Acción que indica que se ha seleccionado una categoría exitosamente.*/
    yield put({ type: "pokemon/selectCategorySaga", payload: categoryFormated });
    yield put(fetchCategoriesSuccess());

  } catch (error) {
    yield put(fetchCategoryFailed());
  }
}


export function* runSaga() {
  yield takeEvery("pokemon/fetchCategoriesPending", fetchCategoriesSaga);
  yield takeEvery("pokemon/selectCategory", selectedCategorySaga);
}

interface State {
  isLoading: boolean,
  categories: Categories[],
  selectedCategory:Category,
}

 const initialState: State = {
   isLoading: false,
   categories: [],
   selectedCategory: { name: "", items:[ { name: "", url: "" } ]},
 };

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    fetchCategoriesPending: (state) => {
      state.isLoading = true;
    },
    fetchCategoriesSuccess: (state) => {
      state.isLoading = false;
    },
    fetchCategoriesFailed: (state) => {
      state.isLoading = false;
    },
    selectCategory: (state,_action) => {
      state.isLoading = true;
    },
    selectCategoryPending: (state) => {
      state.isLoading = true;
    },
    selectCategorySuccsess: (state) => {
      state.isLoading = true;
    },
    fetchCategoryFailed: (state) => {
      state.isLoading = false;
    },
    fetchCategoriesSagas: (state, action: PayloadAction<Categories[]>) => {
      state.categories = action.payload;
      state.isLoading = false;
    },
    selectCategorySaga:(state,action:any)=>{
      state.selectedCategory = action.payload;
      state.isLoading = false;
    }
  },
});

export const {
  fetchCategoriesPending,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
  selectCategory,
  selectCategoryPending,
  selectCategorySuccsess,
  fetchCategoryFailed,
} = pokemonSlice.actions;

export default pokemonSlice.reducer
