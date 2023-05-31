import { useEffect, useState } from "react"
import { getOrdersById } from "../Axios/orderAxios"

export const ListOrders = () => {

    // משתנה ששןמר את רשימת הקניות של הלקוח
    const [list, setList] = useState([])

    // מיד בעת טעינת הקומפוננטה תשוגר רשימת ההזמנות לרדוסר
    useEffect(() => {
        let clint = JSON.parse(sessionStorage.getItem("currentUser"))
        getOrdersById(clint.userId).then(x => setList(x.data))
    }, [])

    return (
        <div className="my-5 border-2 border-warning">
            <table className="table table-striped my-5 border border-2 border-warning">
                <thead>
                    <tr>
                        <th>orderId</th>
                        <th>orderDate</th>
                        <th>finalPrice</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((o, i) => (
                            <tr key={i}>
                                <td>{o.orderId}</td>
                                <td>{o.orderDate.slice(0, 10) + " " +  o.orderDate.slice(11, 16)}</td>
                                <td>{o.finalPrice}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}