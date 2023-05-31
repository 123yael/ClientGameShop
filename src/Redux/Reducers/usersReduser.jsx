import produce from 'immer'

const usersState = {
    listUsers: []
}

export const UserReducer = produce(
    (state, action) => {
        switch (action.type) {
            case 'SET-USERS': state.listUsers = action.payload
                break;
            case 'ADD-USER': state.listUsers.push(action.payload)
                break;
            default:
                break;
        }
    }, usersState)

export default UserReducer