import axios from "axios"

let path = 'https://localhost:44307/api'

export const checkOrder = (listProducts) => {
    return axios.post(`${path}/Cart/CheckOrder`, listProducts)
}

export const finishOrder = (id, listProducts) => {
    return axios.post(`${path}/Cart/FinishOrder/${id}`, listProducts)
}