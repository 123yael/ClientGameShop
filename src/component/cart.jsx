import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { checkOrder } from "../Axios/cartAxios"
import { setToCart } from "../Redux/Actions/cartAction"

export const Cart = () => {

    // משתנה שדרכו ניתן לשגר ערכים לרדוסר
    const dispatch = useDispatch()

    // חילוץ רשימת העגלה מהרדוסר
    let listCart = useSelector(p => p.CartReducer.listCart)

    // משתנה שדרכו ניתן לעבור בין קומפוננטות
    let navigate = useNavigate()

    // משתנה שמיצג את הסכום הסופי של הקניה לפני הבדיקה אם קים במלאי
    const [sum, setSum] = useState(parseFloat(listCart.reduce((x, y) => x = x + y.finalPrice, 0)))

    // הפחתת כמות של מוצר
    const lower = (id) => {
        let tempCart = [...listCart]
        for (let i = 0; i < tempCart.length; i++) {
            if (tempCart[i].productId === id) {
                let tempProd = { ...tempCart[i] }
                setSum(sum - tempProd.productPrice)
                tempProd.count -= 1
                if (tempProd.count === 0) {
                    tempCart.splice(i, 1)
                    break
                }
                tempProd.finalPrice = tempProd.finalPrice - tempProd.productPrice
                tempCart[i] = { ...tempProd }
            }
        }
        dispatch(setToCart(tempCart))
    }

    // הוספת כמות של מוצר
    const add = (id) => {
        let tempCart = [...listCart]
        for (let i = 0; i < tempCart.length; i++) {
            if (tempCart[i].productId === id) {
                let tempProd = { ...tempCart[i] }
                tempProd.count += 1
                tempProd.finalPrice += tempProd.productPrice
                tempCart[i] = { ...tempProd }
                setSum(sum + tempProd.productPrice)
            }
        }
        dispatch(setToCart(tempCart))
    }

    // פונקציה להסרת מוצר מהעגלה
    const dell = (id) => {
        let PriceToLower = listCart.find(p => p.productId === id).finalPrice
        setSum(sum - PriceToLower)
        let newCart = listCart.filter(p => p.productId !== id)
        dispatch(setToCart(newCart))
    }

    // פונקציה לסיום קניה
    const finishOrder = () => {
        let clint = JSON.parse(sessionStorage.getItem("currentUser"))
        if (clint === null) {
            alert("להמשך קניה הינך נדרש להתחבר למערכת")
            return
        }
        if (listCart.length === 0) {
            alert("אין מוצרים בעגלה")
            return
        }
        // בדיקה כמה מוצרים חסרים מכל דבר אם בכלל
        checkOrder(listCart).then(x => {
            let res = ""
            let finalPrice = sum
            let ans = true
            x.data.forEach((element, i) => {
                if (element > 0) {
                    res += element + " " + listCart[i].productName + "\n"
                    finalPrice -= (listCart[i].productPrice * element)
                }
            })
            if (finalPrice < 1) {
                alert("מצטערים אך לא קיים במלאי שום מוצר, בחר מוצרים אחרים")
                return
            }
            if (res === "")
                ans = window.confirm("כל המוצרים קיימים במלאי, הינך בטוח שאתה רוצה לקנות במחיר " + finalPrice + "?")
            else
                ans = window.confirm("לא כל המוצרים קימים במלאי חסר: \n" + res + "רוצה להמשיך לקנות במחיר " + finalPrice + " ? ")
            if (ans === true) {
                let newCart = []
                listCart.forEach((p, i) => {
                    let tempP = { ...p }
                    tempP.count -= x.data[i]
                    if (tempP.count > 0) {
                        tempP.finalPrice = tempP.count * tempP.productPrice
                        newCart.push(tempP)
                    }
                })
                dispatch(setToCart(newCart))
                navigate("/payment")
            }
        })
    }

    return (
        <div className="bd-dark text-light mt-5">
            <table className="table table-striped mt-5 border border-2 border-warning">
                <thead>
                    <tr>
                        <th></th>
                        <th>pic</th>
                        <th>productName</th>
                        <th>productPrice</th>
                        <th>count</th>
                        <th>sum</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listCart.map((p, i) => (
                            <tr key={i} className="align-middle">
                                <td className="pe-5"><button className="btn btn-dark" onClick={() => dell(p.productId)}>✖</button></td>
                                <td><img src={`https://localhost:44307/pic/${p.productPic}`} width={100} alt={p.productPic}></img></td>
                                <td>{p.productName}</td>
                                <td>{p.productPrice}</td>
                                <td className="m-0"><button onClick={() => lower(p.productId)} className="btn btn-warning me-2">-</button>
                                    {p.count}
                                    <button onClick={() => add(p.productId)} className="btn btn-warning ms-2">+</button></td>
                                <td>{p.finalPrice}</td>
                            </tr>
                        ))
                    }
                    <tr className="align-middle">
                        <td colspan="5" style={{ textAlign: "right" }}>Total before checking in stock:</td>
                        <td>{sum}</td>
                    </tr>
                </tbody>
            </table>

            <div className="mb-5">
                <button className="btn btn-dark w-100 mb-5" onClick={() => finishOrder()}>סיום הזמנה</button>
            </div>
        </div>
    )
}