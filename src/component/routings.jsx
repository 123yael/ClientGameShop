import { Route, Routes } from "react-router-dom";
import { Cart } from "./cart";
import { HomePage } from "./homePage";
import { ListCategories } from "./listCategories";
import { ListOrders } from "./listOrders";
import { ListProducts } from "./listProducts";
import { Nav } from "./nav";
import { Payment } from "./payment";
import { ProductDetails } from "./productDetails";
import { SignUp } from "./signUp";

export const Routings = () => {
    return (
        <Routes>
            <Route path="/" element={<Nav></Nav>}>
                <Route path="/" element={<HomePage></HomePage>}></Route>
                <Route path="/productDetails" element={<ProductDetails></ProductDetails>}></Route>
                <Route path="/signUp" element={<SignUp></SignUp>}></Route>
                <Route path="listProducts" element={<ListProducts></ListProducts>}></Route>
                <Route path="listCategories" element={<ListCategories></ListCategories>}></Route>
                <Route path="cart" element={<Cart></Cart>}></Route>
                <Route path="/payment" element={<Payment></Payment>}></Route>
                <Route path="listOrders" element={<ListOrders></ListOrders>}></Route>
            </Route>
        </Routes>
    )
}
