import { useDispatch } from "react-redux"
import { addNewUser } from "../Axios/usersAxios"
import { addUser } from "../Redux/Actions/userAction"

export const SignUp = () => {

    // משתנה שדרכו ניתן לשלוח נתונים לרדוסר
    const dispatch = useDispatch()

    // פונקציה להוספת משתמש חדש למערכת
    const add = (e) => {
        e.preventDefault()
        let newUser = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            userEmail: e.target.email.value,
            userPassword: e.target.password.value
        }
        if (e.target.phone.value !== '')
            newUser.userPhone = e.target.phone.value
        if (e.target.address.value !== '')
            newUser.userAddress = e.target.address.value
        addNewUser(newUser).then(x => {
            dispatch(addUser(x.data))
            alert("נרשמת בהצלחה 😀")
        })
    }

    return (
        <div className="row my-5">
            <div className="col-3"></div>
            <form onSubmit={(e) => add(e)} className="bg-warning p-5 mt-5 text-dark col-6 w-50" style={{ textAlign: "left" }}>
                <div className="row mt-3">
                    <div className="mb-3 col-6">
                        <label className="form-label">FirstName:</label>
                        <input id="firstName" required type="text" pattern=".{2,}" title="אנא הזן 2 תווים לפחות" className="form-control" placeholder="Enter firstName"></input>
                    </div>
                    <div className="mb-3 col-6">
                        <label className="form-label">LastName:</label>
                        <input id="lastName" required type="text" pattern=".{2,}" title="אנא הזן 2 תווים לפחות" className="form-control" placeholder="Enter lastName"></input>
                    </div>
                    <div className="mb-3 col-6">
                        <label className="form-label">Phone:</label>
                        <input id="phone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" title="הזן בפורמט: xxx-xxx-xxxx" className="form-control" placeholder="Enter phone"></input>
                    </div>
                    <div className="mb-3 col-6">
                        <label className="form-label">Email:</label>
                        <input id="email" type="email" className="form-control" placeholder="Enter email"></input>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input id="password" required type="password" className="form-control" placeholder="Enter password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}" title="הסיסמא חייב להכיל לפחות אות קטנה אחת, אות גדולה אחת ומספר אחד. 6-12 תווים"></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Address:</label>
                    <input id="address" type="text" className="form-control" placeholder="Enter address"></input>
                </div>
                <button type="submit" className="btn btn-primary w-100">הוסף</button>
            </form>
        </div>
    )
}