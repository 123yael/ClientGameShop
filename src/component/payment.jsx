import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { finishOrder } from "../Axios/cartAxios"

export const Payment = () => {

    // משתנה שדרכו ניתן ללכת לקומפוננטה אחרת
    let navigate = useNavigate()

    // עיצובים של הקבלה
    let sizeFont = { fontSize: "18px" }
    let textShadow = { fontSize: "18px", textShadow: "2px 2px 5px black" }

    // חילוץ רשימת העגלה
    let listCart = useSelector(p => p.CartReducer.listCart)

    // משתנה שאומר האם להציג קבלה
    const [isShow, setIsShow] = useState(false)

    // משתנה שמקבל את ההזמנה הנוכחית
    const [thisOrder, setThisOrder] = useState({})

    // פונקציה לסיום הזמנה ותשלום
    const finish = (e) => {
        e.preventDefault()
        let clint = JSON.parse(sessionStorage.getItem("currentUser"))
        finishOrder(clint.userId, listCart).then(x => {
            if (x.data !== "not ok" && x.data !== "") {
                let obj = { ...x.data, orderDate: x.data.orderDate.slice(0, 10) + " " + x.data.orderDate.slice(11, 16) }
                setThisOrder(obj)
                setIsShow(true)
            }
            else
                alert("משהו השתבש במהלך ההזמנה")
        })
    }

    return (
        <div className="m-5">
            {isShow && <div className="modal-dialog-centered modal">
                <div className="col-md-5 col-lg-4 order-md-last border m-5 p-5 m-auto bg-light" style={{ boxShadow: "1px 1px 1px 700px rgba(0, 0, 0, 0.7)" }} id="k">
                    <button type="button" className="btn-close d-flex" onClick={() => navigate("/")}></button>
                    <h4 className="justify-content-between align-items-center mb-3">
                        <div>NICE GAME בע"מ</div>
                        <div style={sizeFont}>בית שמש</div>
                        <div style={sizeFont}>פלאפון: 058-322-0353</div>
                    </h4>
                    <div>
                        <span className="float-end">לכבוד: {thisOrder.userId}</span>
                        <span className="d-flex">מקור</span>
                    </div>
                    <ul className="list-group mb-3">
                        <li className="list-group-item d-flex justify-content-between lh-sm">
                            <span style={textShadow}>סה"כ</span>
                            <span style={textShadow}>כמות</span>
                            <span style={textShadow}>מחיר</span>
                            <span style={textShadow}>תיאור</span>
                            <span style={textShadow}>קוד</span>
                        </li>
                        {
                            listCart.map((p, i) => (
                                <li className="list-group-item d-flex justify-content-between lh-sm" key={i}>
                                    <span style={sizeFont}>₪ {p.finalPrice}</span>
                                    <span style={sizeFont}>{p.count}</span>
                                    <span style={sizeFont}>{p.productPrice}</span>
                                    <span style={sizeFont}>{p.productName}</span>
                                    <span style={sizeFont}>{p.productId}</span>
                                </li>
                            ))
                        }
                        <li className="list-group-item d-flex justify-content-between">
                            <strong style={{ fontSize: "20px" }}>₪ {thisOrder.finalPrice}</strong>
                            <span style={{ fontSize: "20px", textShadow: "2px 2px 5px black" }}>סה"כ לתשלום לפני מע"מ</span>
                        </li>
                    </ul>
                    <div>זמן קניה</div>
                    <div>{thisOrder.orderDate}</div>
                    <hr></hr>
                    <div>
                        <p style={{ direction: "rtl", fontSize: "17px" }}>שימו לב! בחנות שלנו לא יתכן מצב של חזרות, עמכם הסליחה.
                            זה כמובן גם בגלל שהמוצרים שלנו כל כך טובים שלא תרצו להחזיר,
                            וגם בגלל שלא תכנתתי את זה אבל אל תידאגו לא באמת הורדנו לכם כסף מהחשבון :)</p>
                    </div>
                </div>
            </div>}
            <div className="m-5 border Small shadow" style={{ textAlign: "right", direction: "rtl" }}>
                <div className="m-5 text-dark">
                    <form onSubmit={(e) => finish(e)}>
                        <h4 className="mb-5" style={{ textAlign: "center" }}>תשלום על ההזמנה ע"י כרטיס אשראי</h4>
                        <div className="row gy-3">
                            <div className="col-md-6">
                                <label htmlFor="cc-name" className="form-label">השם על הכרטיס</label>
                                <input required pattern=".{4,}" title="אנא הזן 4 תווים לפחות" type="text" className="form-control" id="cc-name" placeholder="שם על הכרטיס..."></input>
                                <small className="text-muted">השם המלא כפי שמוצג בכרטיס</small>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="cc-number" className="form-label">מספר כרטיס</label>
                                <input required pattern=".{16,}" title="אנא הזן 16 תווים לפחות" type="text" className="form-control" id="cc-number" placeholder="מספר כרטיס..."></input>
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="cc-expiration" className="form-label">תאריך תפוגה</label>
                                <input required type="month" className="form-control" id="cc-expiration" placeholder="תאריך תפוגה..."></input>
                                <div className="invalid-feedback">
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="cc-cvv" className="form-label">CVV</label>
                                <input required pattern=".{3}" title="אנא הזן 3 תווים לפחות" type="number" className="form-control" id="cc-cvv" placeholder="cvv"></input>
                            </div>
                        </div>

                        <hr className="my-5"></hr>
                        <button className="w-100 btn btn-warning btn-lg my-button" type="submit">לתשלום</button>
                    </form>
                </div>
            </div>
        </div >
    )
}