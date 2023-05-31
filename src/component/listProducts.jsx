import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addNewProduct, deleteProducts, getAllProducts, updateProduct } from "../Axios/productsAxios"
import { setProduct } from "../Redux/Actions/productAction"
import { FormProduct } from "./formProduct"


export const ListProducts = () => {

    // משתנה לשיגור הנתונים לרדוסר
    const dispatch = useDispatch()

    // מיד בעת טעינת הקומפוננטה שיגור רשימת המוצרים לרדוסר
    useEffect(() => {
        getAllProducts().then(p => dispatch(setProduct(p.data)))
    }, [])

    // משתנה שאומר האם להציג את הקומפוננטה של הטופס להוספה ועדכון מוצר
    const [isShow, setIsShow] = useState(false)

    // משתנה שמחזיק את המוצר שצריך לעדכן אם בכלל
    const [productToEdit, setProductToEdit] = useState({})

    // חילוץ רשימת המורים מהרדוסר
    let listProducts = useSelector(p => p.ProductReducer.listProducts)

    // פונקציה למחיקת מוצר מרשימת המוצרים
    const dell = (id) => {
        deleteProducts(id).then(p => dispatch(setProduct(p.data)))
    }

    // פונקציה שמראה את הטופס במצב של עדכון
    const editShow = (p) => {
        setIsShow(true)
        setProductToEdit(p)
    }

    // פונקציה שמראה את הטופס במצב של הוספה
    const addShow = () => {
        setIsShow(true)
        setProductToEdit({})
    }

    // פונקציה לעדכון מוצר נשלחת לקומפוונה טופס
    const update = (id, productToEdit) => {
        setIsShow(false)
        updateProduct(id, productToEdit).then(p => dispatch(setProduct(p.data)))
    }

    // פונקציה להוספת מוצר נשלחת לקומפוננטה טופס
    const add = (productToAdd) => {
        setIsShow(false)
        addNewProduct(productToAdd).then(p => dispatch(setProduct(p.data)))
    }

    return (
        <div className="my-5">
            {isShow && <div id="myModal" className="modal-dialog-centered modal">
                <div className="modal-dialog" >
                    <div className="modal-content" style={{ boxShadow: "1px 1px 1px 700px rgba(0, 0, 0, 0.7)" }}>
                        <div className="modal-header">
                            <button type="button" className="btn-close" onClick={() => setIsShow(false)}></button>
                        </div>
                        <div className="modal-body">
                            <FormProduct editProdact={productToEdit} onUpdate={update} onAdd={add}></FormProduct>
                        </div>
                    </div>
                </div>
            </div>}
            <div className="my-5 mx-5">
                <table className="table mt-5 border border-2 border-warning">
                    <thead>
                        <tr>
                            <th>productPic</th>
                            <th>productId</th>
                            <th>categoryName</th>
                            <th>productName</th>
                            <th>productPrice</th>
                            <th>quantityInStock</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listProducts.map((p, i) => (
                                <tr key={i}>
                                    <td><img src={`https://localhost:44307/pic/${p.productPic}`} alt={p.productPic} style={{ width: 100 }}></img></td>
                                    <td>{p.productId}</td>
                                    <td>{p.categoryName}</td>
                                    <td>{p.productName}</td>
                                    <td>{p.productPrice}</td>
                                    <td>{p.quantityInStock}</td>
                                    <td><input className="btn btn-dark" type="button" value="עדכון" onClick={() => editShow(p)}></input></td>
                                    <td><input className="btn btn-dark" type="button" value="מחיקה" onClick={() => dell(p.productId)}></input></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <button onClick={() => addShow()} className="btn btn-dark mb-2 w-100">הוסף מוצר</button>

            </div>
        </div>
    )
}