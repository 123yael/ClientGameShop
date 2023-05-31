import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCategories } from "../Axios/categoriesAxios"
import { setCategories } from "../Redux/Actions/categoryAction"

export const FormProduct = (props) => {

    // משתנה לשיגור נתונים לרדוסר
    const dispatch = useDispatch()

    // מיד בעת טעינת הקומפוננטה תשוגר הרשימה של הקטגוריות לרדוסר 
    useEffect(() => {
        getAllCategories().then(c => dispatch(setCategories(c.data)))
    }, [])

    // שליפת מערך הקטגוריות מהרדוסר
    let listCategories = useSelector(u => u.CategoryReducer.listCategories)

    // משתנה שמחזיק את המוצר לעדכון או שהוא ריק או מלא
    const [productToEdit, setProductToEdit] = useState(props.editProdact)

    // משתנה שאומר איזה כפתור להציג עדכון או הוספה
    const isShow = productToEdit.productId === undefined

    // בדיקת תקינות לטופס הוספה ועדכון
    const check = () => {
        if ((productToEdit.categoryId === undefined || productToEdit.categoryId === "")
         || (productToEdit.productName === undefined || productToEdit.productName === "")
         || (productToEdit.productPrice === undefined || productToEdit.productPrice === "")
         || (productToEdit.quantityInStock === undefined || productToEdit.quantityInStock === "")
         || (productToEdit.productPic === undefined || productToEdit.productPic === ""))
            return
        else if (isShow)
            props.onAdd(productToEdit)
        else
            props.onUpdate(productToEdit.productId, productToEdit)
    }

    return (
        <div>
            <div className="border bg-warning p-4" style={{ textAlign: "left", fontSize: "18px" }}>
                <div className="my-1 me-5 w-100">
                    <label>categoryName</label>
                    <select className="form-select" defaultValue={productToEdit.categoryId} onChange={(e) => { setProductToEdit({ ...productToEdit, categoryId: e.target.value, categoryName: document.getElementById(e.target.value).innerText }) }}>
                        <option hidden>select categoryName</option>
                        {
                            listCategories.map((c, i) => (
                                <option key={i} value={c.categoryId} id={c.categoryId}>{c.categoryName}</option>
                            ))
                        }
                    </select>
                    {(productToEdit.categoryId === undefined || productToEdit.categoryId === "") && <p className="text-danger h6">שדה חובה</p>}
                </div>

                <div className="my-1">
                    <label>ProductName</label>
                    <input defaultValue={productToEdit.productName} type="text" className="form-control" onChange={(e) => setProductToEdit({ ...productToEdit, productName: e.target.value })} placeholder="Enter productName"></input>
                    {(productToEdit.productName === undefined || productToEdit.productName === "") && <p className="text-danger h6">שדה חובה</p>}
                </div>

                <div className="row">
                    <div className="my-1 col-6">
                        <label>ProductPrice</label>
                        <input defaultValue={productToEdit.productPrice} type="number" className="form-control" onChange={(e) => setProductToEdit({ ...productToEdit, productPrice: e.target.value })} placeholder="Enter productPrice"></input>
                        {(productToEdit.productPrice === undefined || productToEdit.productPrice === "") && <p className="text-danger h6">שדה חובה</p>}
                    </div>

                    <div className="my-1 col-6">
                        <label>QuantityInStock</label>
                        <input defaultValue={productToEdit.quantityInStock} min={0} type="number" className="form-control" onChange={(e) => setProductToEdit({ ...productToEdit, quantityInStock: e.target.value })} placeholder="Enter quantityInStock"></input>
                        {(productToEdit.quantityInStock === undefined || productToEdit.quantityInStock === "") && <p className="text-danger h6">שדה חובה</p>}
                    </div>
                </div>

                <div className="my-1">
                    <label>ProductPic</label>
                    <input defaultValue={productToEdit.productPic} type="text" className="form-control" onChange={(e) => setProductToEdit({ ...productToEdit, productPic: e.target.value })} placeholder="Enter productPic"></input>
                    {(productToEdit.productPic === undefined || productToEdit.productPic === "") && <p className="text-danger h6">שדה חובה</p>}
                </div>
            </div>
            <button className="btn btn-dark w-100" onClick={() => check()}>{isShow ? "הוסף" : "עדכן"}</button>
        </div>
    )
}