import produce from 'immer'

const categoriesState = {
    listCategories: []
}

export const CategoryReducer = produce(
    (state, action) => {
        switch (action.type) {
            case 'SET-CATEGORIES': state.listCategories = action.payload
                break;
            default:
                break;
        }
    }, categoriesState)

export default CategoryReducer