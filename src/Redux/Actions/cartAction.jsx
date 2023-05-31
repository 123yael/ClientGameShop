
export const setToCart = (value) => {
    return { type: 'SET-CART', payload: value }
}

export const addToCart = (value) => {
    return { type: 'ADD-CART', payload: value }
}