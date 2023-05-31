import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addToCart, setToCart } from "../Redux/Actions/cartAction";

export const ProductDetails = () => {

    // משתנה שגרכו ניתן לשגר נתונים לרדוסר
    const dispatch = useDispatch()

    // חילוץ רשימת העגלה מהרדוסר
    let listCart = useSelector(p => p.CartReducer.listCart)

    // משתנה שמיצג את המוצר הנוכחי שצריך להראות את הפרטים שלו
    const currentProduct = useLocation().state

    // פונקציה להוספת מוצר לעגלה
    const addProdToCart = (Product) => {
        let tempCart = [...listCart]
        for (let i = 0; i < tempCart.length; i++) {
            if (tempCart[i].productId === Product.productId) {
                let tempProd = { ...tempCart[i] }
                tempProd.count += 1
                tempProd.finalPrice = tempProd.count * tempProd.productPrice
                tempCart[i] = { ...tempProd }
                dispatch(setToCart(tempCart))
                return
            }
        }
        let pTemp = { ...Product }
        pTemp.count = 1
        pTemp.finalPrice = pTemp.productPrice
        dispatch(addToCart(pTemp))
    }

    return (
        <div className="mt-5">
            <div className="mt-5 bg-warning Small shadow">
                <div className="container col-xxl-8 px-1 py-5">
                    <div className="row flex-lg-row-reverse g-5 py-5">
                        <div className="col-lg-6">
                            <img src={`https://localhost:44307/pic/${currentProduct.productPic}`} className="d-block mx-lg-auto img-fluid" alt={currentProduct.productPic}></img>
                        </div>
                        <div className="col-lg-6" style={{textAlign:"right"}}>
                            <h1 className="fw-bold mb-4 align-items-center">{currentProduct.productName}</h1>
                            <p className="lead"><strong>שם קטגוריה:</strong> {currentProduct.categoryName}</p>
                            <p className="lead">₪ <strong>מחיר:</strong> {currentProduct.productPrice}</p>
                            <p className="lead"><strong>כמות במלאי:</strong> {currentProduct.quantityInStock}</p>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                <button type="button" className="btn btn-primary btn-lg px-4 me-md-5" onClick={() => addProdToCart(currentProduct)}>הוסף לסל</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}