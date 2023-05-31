import produce from 'immer'

const cartState = {
    listCart: []
}

export const CartReducer = produce(
    (state, action) => {
        switch (action.type) {
            case 'SET-CART': state.listCart = action.payload
                break;
            case 'ADD-CART': state.listCart.push(action.payload)
                break;
            default:
                break;
        }
    }, cartState)

export default CartReducer