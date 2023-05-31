import produce from 'immer'

const productsState = {
    listProducts: []
}

export const ProductReducer = produce(
    (state, action) => {
        switch (action.type) {
            case 'SET-PRODUCT': state.listProducts = action.payload
                break;
            default:
                break;
        }
    }, productsState)

export default ProductReducer