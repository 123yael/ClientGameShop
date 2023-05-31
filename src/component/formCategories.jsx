import { useState } from "react"


export const FormCategories = (props) => {

    // משתנה ששומר את הקטגוריה לעדכון או שזה מלא או שזה ריק
    const [categoryToEdit, setCategoryToEdit] = useState(props.editCategory)

    // משתנה שאומר איזה כפתור להציג עדכון או הוספה
    const isShow = categoryToEdit.categoryId === undefined

    // פונקציה בדיקת תקינות קלט והוספה או עדכון
    const check = () => {
        if (categoryToEdit.categoryName === undefined || categoryToEdit.categoryName === "")
            return
        else if (isShow)
            props.onAdd(categoryToEdit)
        else
            props.onUpdate(categoryToEdit.categoryId, categoryToEdit)
    }

    return (
        <div>
            <div className="border bg-warning p-4 ">
                <div className="" style={{ textAlign: "left", fontSize: "18px" }}>
                    <label>CategoryName</label>
                    <input defaultValue={categoryToEdit.categoryName} type="text" className="form-control" onChange={(e) => setCategoryToEdit({ ...categoryToEdit, categoryName: e.target.value })} placeholder="Enter categoryName"></input>
                    {(categoryToEdit.categoryName === undefined || categoryToEdit.categoryName === "") && <p className="text-danger h6">שדה חובה</p>}
                </div>
            </div>
            <button className="btn btn-dark w-100" onClick={() => check()}>{isShow ? "הוסף" : "עדכן"}</button>
        </div>
    )
}