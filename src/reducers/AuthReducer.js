import bcrypt from 'bcryptjs'
const initialState = {
    username: '',
    isAuthenticated: false,
    errorMessage: ''
}
const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_USER':

            if (localStorage.getItem(action.user.username)) {
                return {
                    isAuthenticated: false,
                    username: '',
                    errorMessage: 'User already exist'

                }
            }
            else {
                action.user.password = bcrypt.hashSync(action.user.password, 10)
                action.user['todos'] = []
                localStorage.setItem(action.user.username, JSON.stringify(action.user))
                return {
                    isAuthenticated: true,
                    username: action.user.username,
                    errorMessage: ''
                }

            }
        case 'LOG_IN_SUCCESS':
            let userData = JSON.parse(localStorage.getItem(action.user.username))
            return {
                isAuthenticated: true,
                username: userData.username,
                errorMessage: ''
            }

        case "LOG_IN_FAILURE":
            return {
                isAuthenticated: false,
                username: '',
                errorMessage: action.errorMessage
            }
        case 'LOG_OUT':
            return {
                isAuthenticated: false,
                username: '',
                errorMessage: ''
            }
        default:
            return state


    }
}
export default AuthReducer