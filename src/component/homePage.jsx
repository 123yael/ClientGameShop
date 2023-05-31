import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../Axios/productsAxios"
import { setProduct } from "../Redux/Actions/productAction"
import { addToCart, setToCart } from "../Redux/Actions/cartAction"
import { useNavigate } from "react-router-dom"
import { getAllCategories } from "../Axios/categoriesAxios"
import { setCategories } from "../Redux/Actions/categoryAction"

export const HomePage = () => {

    // משתנה שדרכו ניתן לשגר מידע לרדוסר
    const dispatch = useDispatch()

    // משתנה שדרכו ניתן לעבור בין קומפוננטות
    let navigate = useNavigate()

    // רשימת מוצרים מסוננת
    const [listPFilter, setListPFilter] = useState([])

    // משתנים לפילטור מערך המוצרים על פי מחיר
    const [max, setMax] = useState(0)
    const [min, setMin] = useState(0)
    const [cv, setCv] = useState(0)
    const [name, setName] = useState('')
    const [catego, setCatego] = useState('all')

    // מיד בעת טעינת הקומפוננטה ישוגרו הנתונים של המוצרים והקטגוריות לרדוסר
    // וכן חישוב המקסימום והמינימום לסינון
    useEffect(() => {
        getAllProducts().then(p => {
            dispatch(setProduct(p.data))
            setListPFilter([...p.data])
            let maxT = 0, minT = 999999
            p.data.forEach(p => {
                if (p.productPrice > maxT)
                    maxT = p.productPrice
                if (p.productPrice < minT)
                    minT = p.productPrice
            })
            setMax(maxT)
            setMin(minT)
            setCv(maxT)
        })
        getAllCategories().then(c => dispatch(setCategories(c.data)))
    }, [])

    // חילוץ רשימת המוצרים, הקטגוריות ורשימת הקניה
    let listProducts = useSelector(p => p.ProductReducer.listProducts)
    let listCategories = useSelector(u => u.CategoryReducer.listCategories)
    let listCart = useSelector(p => p.CartReducer.listCart)

    // סינון רשימת המוצרים
    const myFilter = (list, sign) => {
        let l = [...list]
        if (sign === "p")
            l = l.filter(x => (catego === "all" || x.categoryId === parseInt(catego)) && x.productName.slice(0, name.length) === name)
        else if (sign === "n")
            l = l.filter(x => (catego === "all" || x.categoryId === parseInt(catego)) && (x.productPrice <= cv))
        else
            l = l.filter(x => (x.productPrice <= cv) && x.productName.slice(0, name.length) === name)
        setListPFilter([...l])
    }

    // סינון מערך המוצרים לפי הקטגוריה
    const filterProductsC = (e) => {
        setCatego(e.target.value)
        let l = listProducts.filter(x => e.target.value === "all" || x.categoryId === parseInt(e.target.value))
        myFilter(l, "c")
    }

    // סינון מערך המוצרים על פי שם המוצר
    const filterProductsN = (e) => {
        setName(e.target.value)
        let l = listProducts.filter(x => x.productName.slice(0, e.target.value.length) === e.target.value)
        myFilter(l, "n")
    }

    // סינון מערך המוצרים על פי מחיר המוצר
    const filterProductsP = (e) => {
        setCv(parseInt(e.target.value))
        let l = listProducts.filter(x => x.productPrice <= parseInt(e.target.value))
        myFilter(l, "p")
    }

    // הוספת מוצר לעגלה
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

    // פונקציה ששולחת לקומפוננטה פרטים נוספים על המוצר
    const goToProductdetails = (p) => {
        navigate('/productDetails', { state: p })
    }

    return (
        <div className="my-5">
            <div className="row my-5 mx-0">
                <div className="row col-10">
                    {
                        listPFilter.map((p, i) => (
                            <div className="col-xl-3 col-lg-4 col-sm-6" key={i} >
                                <div className="card m-2 Small shadow border border-2 border-warning">
                                    <button className="btn p-0" onClick={() => goToProductdetails(p)}>
                                        <img className="card-img-top m-0 p-0" src={`https://localhost:44307/pic/${p.productPic}`} alt={p.productPic}></img>
                                    </button>
                                    <div className="card-body" style={{ textAlign: "right" }}>
                                        <h4 className="card-title">{p.productName}</h4>
                                        <p className="card-text">₪ {p.productPrice}</p>
                                        <button className="btn btn-dark" width={"100%"} onClick={() => addProdToCart(p)}>הוסף לסל</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="col-2 border bg-dark text-light fixed-right pb-5 card my-2 py-2" style={{ textAlign: "right", position: "fixed", right: "10px" }}>
                    <div className="h6 m-0 mt-4"><span className="float-start">{cv}</span>סינון לפי מחיר</div>
                    <input className="m-0" type={'range'} min={min} max={max} defaultValue={max} style={{ width: "100%", fontSize: "20px" }} onChange={(e) => filterProductsP(e)}></input>
                    <div>
                        <span className="float-start" style={{ fontSize: "15px" }}>₪ {min}</span>
                        <span className="float-end" style={{ fontSize: "15px" }}>₪ {max}</span>
                    </div>
                    <div className="h6 mt-4">סינון לפי קטגוריה</div>
                    <select className="w-100" style={{ fontSize: "15px", height: "35px" }} onChange={(e) => filterProductsC(e)}>
                        <option hidden></option>
                        {
                            listCategories.map(c => (
                                <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>
                            ))
                        }
                        <option value={"all"}>כל הקטגוריות...</option>
                    </select>
                    <div className="h6 mt-4">חיפוש לפי שם מוצר</div>
                    <input type={'text'} style={{ width: "100%", fontSize: "15px", height: "35px" }} placeholder="enter name..." onChange={(e) => filterProductsN(e)}></input>
                </div>
            </div>
        </div>
    )
}