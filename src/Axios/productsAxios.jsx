import axios from "axios"

let path = 'https://localhost:44307/api'

export const getAllProducts = () => {
    return axios.get(`${path}/Products/GetAllProducts`)
}

export const addNewProduct = (newProduct) => {
    return axios.post(`${path}/Products/AddNewProduct`, newProduct)
}

export const updateProduct = (id, productTEdit) => {
    return axios.put(`${path}/Products/UpdateProduct/${id}`, productTEdit)
}

export const deleteProducts = (id) => {
    return axios.delete(`${path}/Products/DeleteProduct/${id}`)
}
