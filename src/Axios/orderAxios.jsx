import axios from "axios"

let path = 'https://localhost:44307/api'

export const getOrdersById = (id) => {
    return axios.get(`${path}/Orders/GetAllOrdersByUserId/${id}`)
}