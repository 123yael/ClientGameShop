import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addNewCategory, deleteCategory, getAllCategories, updateCategory } from "../Axios/categoriesAxios"
import { setCategories } from "../Redux/Actions/categoryAction"
import { FormCategories } from "./formCategories"

export const ListCategories = () => {

    // משתנה שדרכו ניתן לשגר לרדוסר
    const dispatch = useDispatch()

    // מיד בעת טעינת הקומפוננטה תשוגר רשימת הקטגוריות לרדוסר
    useEffect(() => {
        getAllCategories().then(c => dispatch(setCategories(c.data)))
    }, [])

    // חילוץ רשימת הקטגוריות מהרדוסר
    let listCategories = useSelector(u => u.CategoryReducer.listCategories)

    // משתנה שאומר האם להציג את הטפס או לא
    const [isShow, setIsShow] = useState(false)

    // משתנה שומר את הקטגוריה לעדכון אם בכלל
    const [categoryToEdit, setCategoryToEdit] = useState({})

    // פונקציה למחיקת קטגוריה מהמערכת
    const dell = (id) => {
        deleteCategory(id).then(p => dispatch(setCategories(p.data)))
    }

    // פונקציה שפותחת את הטופס במצב של עריכה
    const editShow = (c) => {
        setIsShow(true)
        setCategoryToEdit(c)
    }

    // פונקציה שפותחת את הטופס במצב של הוספה
    const addShow = () => {
        setIsShow(true)
        setCategoryToEdit({})
    }

    // פונקציה לעדכון מוצר שתשלח לטופס
    const update = (id, categoryToEdit) => {
        setIsShow(false)
        updateCategory(id, categoryToEdit).then(p => dispatch(setCategories(p.data)))
    }

    // פונקציה להוספת מוצר שתשלח לטופס
    const add = (categoryToAdd) => {
        setIsShow(false)
        addNewCategory(categoryToAdd).then(c => dispatch(setCategories(c.data)))
    }

    return (
        <div className="mt-5">
            {isShow && <div id="myModal" className="modal-dialog-centered modal shadow">
                <div className="modal-dialog w-25">
                    <div className="modal-content" style={{ boxShadow: "1px 1px 1px 700px rgba(0, 0, 0, 0.7)" }}>
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setIsShow(false)}></button>
                        </div>
                        <div className="modal-body">
                            <FormCategories editCategory={categoryToEdit} onUpdate={update} onAdd={add}></FormCategories>
                        </div>
                    </div>
                </div>
            </div>}
            <table className="table table-striped mt-5 border  border-2 border-warning">
                <thead>
                    <tr>
                        <th>categoryId</th>
                        <th>categoryName</th>
                        <th>עדכון</th>
                        <th>מחיקה</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listCategories.map((c, i) => (
                            <tr key={i}>
                                <td>{c.categoryId}</td>
                                <td>{c.categoryName}</td>
                                <td><input className="btn btn-dark" type={'button'} value='עדכון' onClick={() => editShow(c)}></input></td>
                                <td><input className="btn btn-dark" type={'button'} value='מחיקה' onClick={() => dell(c.categoryId)}></input></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <button onClick={() => addShow()} className="btn btn-dark w-100">הוסף קטגוריה</button>
        </div>
    )
}