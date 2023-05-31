
import { combineReducers } from "redux";
import { createStore } from "redux";
import UserReducer from "./Reducers/usersReduser.jsx";
import ProductReducer from "./Reducers/productsReduser";
import CategoryReducer from "./Reducers/categoriesReduser";
import CartReducer from "./Reducers/cartReduser";

const reducer = combineReducers({ UserReducer, ProductReducer, CategoryReducer, CartReducer })

export const store = createStore(reducer)
window.store = store
export default store