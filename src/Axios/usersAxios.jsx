import axios from "axios"

const path = 'https://localhost:44307/api'

export const getAllUsers = () => {
    return axios.get(`${path}/Users/GetAllUsers`)
}

export const addNewUser = (newUser) => {
    return axios.post(`${path}/Users/AddNewUser`, newUser)
}

export const findUserByEmailAndPassword = (email, pass) => {
    return axios.get(`${path}/Users/findUserByEmailAndPassword/${email}/${pass}`)
}

export const isManager = (email, pass) => {
    return axios.get(`${path}/Users/isManager/${email}/${pass}`)
}
