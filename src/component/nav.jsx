import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { NavLink, Link, useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { findUserByEmailAndPassword, isManager } from "../Axios/usersAxios"

export const Nav = () => {

    // משתנה שמציג לי את כמות המוצרים שנבחרו לעגלה
    const [count, setCount] = useState(0)

    // שליפת העגלה מהרדוסר
    let listCart = useSelector(x => x.CartReducer.listCart)

    // בעת שינוי העגלה מתבצע חישוב מחדש
    useEffect(() => {
        let c = 0
        listCart.forEach(p => {
            c += p.count
        })
        setCount(c)
    }, [listCart])


    useEffect(() => {
        let clint = JSON.parse(sessionStorage.getItem("currentUser"))
        if (clint !== null) {
            setName(clint.firstName)
            setLog('LOG OUT')
        }
    }, [])

    // להציג את האפשרויות של המנהל או לא
    const [showToManager, setShowToManager] = useState(false)

    // השם פרטי של המשתמש הנוכחי
    const [name, setName] = useState('')

    // משתנה שמגדיר לאיזה מצב לשנות את כפתור ההתחברות או ההתנתקות
    const [log, setLog] = useState('LOG IN')

    // משתנה שדרכו יהיה ניתן לעבור לקומפוננטה אחרת
    let navigate = useNavigate()

    // פונקציה להתחברות למערכת
    const logIn = (event) => {
        if (log === 'LOG OUT') {
            sessionStorage.clear()
            setShowToManager(false)
            setName('')
            navigate('/')
            return
        }
        event.preventDefault()
        const email = event.target.email.value
        const pass = event.target.pass.value
        event.target.email.value = ''
        event.target.pass.value = ''
        if (email === "" || pass === "")
            return
        // בדיקה האם נכנס מנהל
        isManager(email, pass).then(x => {
            if (x.data) {
                setShowToManager(true)
                setName('מנהל')
                setLog('LOG OUT')
                navigate('/')
            }
            else
                isClint(email, pass)
        })
    }

    // פונקציה שבודקת האם המשתמש קיים במערכת
    const isClint = (email, pass) => {
        findUserByEmailAndPassword(email, pass).then(x => {
            if (x.data === '') {
                if (window.confirm("אינך מופיע במערכת, האם ברצונך להמשיך ולהירשם?"))
                    navigate('signUp')
                return
            }
            sessionStorage.setItem("currentUser", JSON.stringify(x.data))
            setName(x.data.firstName)
            setLog('LOG OUT')
            navigate('/')
        })
    }

    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top p-0">
                <div className="container-fluid px-0">
                    <Link className="me-3" to='/'><img alt="logo" src="pic/logotext.jpg" width={120}></img></Link>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/'>HOME</NavLink>
                            </li>
                            {showToManager ? <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='listProducts'>LIST PRODUCTS</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='listCategories'>LIST CATEGORIES</NavLink>
                                </li> </> : <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='signUp'>SIGN UP</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='cart'>CART <span id="b" className="badge rounded-pill bg-warning">{count}</span></NavLink>
                                </li> </>
                            }
                            { (name !== "" && name !== "מנהל") &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='listOrders'>LIST ORDERS</NavLink>
                                </li>}
                        </ul>

                        <form className="d-flex" onSubmit={(e) => logIn(e)}>
                            <input className="btn btn-warning" type="submit" value={log}></input>
                            {log === 'LOG IN' && <>
                                <input className="form-control me-2 ms-2" type="email" placeholder="email..." id="email" />
                                <input className="form-control me-2" type="password" placeholder="password..." id="pass" />
                            </>}
                        </form>

                        {(name !== "") && <div className="mx-2 btn btn-warning">{name}</div>}
                    </div>
                </div>
            </nav>
            <div className="myStyle">
                <Outlet></Outlet>
            </div>
            <footer className="fixed-bottom bg-dark text-light m-0 border-dark p-3">אתר זה הוקם ע"י יעל מלכין ©</footer>
        </>
    )
}