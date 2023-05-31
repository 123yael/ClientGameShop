import axios from "axios"

let path = 'https://localhost:44307/api'

export const getAllCategories = () => {
    return axios.get(`${path}/Categories/GetAllCategories`)
}

export const addNewCategory = (newCategory) => {
    return axios.post(`${path}/Categories/AddNewCategory`, newCategory)
}

export const updateCategory = (id, newCategory) => {
    return axios.put(`${path}/Categories/UpdateCategory/${id}`, newCategory)
}

export const deleteCategory = (id) => {
    return axios.delete(`${path}/Categories/DeleteCategory/${id}`)
}
