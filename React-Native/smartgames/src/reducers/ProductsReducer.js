import {ToastAndroid} from 'react-native'
const INITIAL_STATE = {
    produtos: [],
    produtosDestaques: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SELECT_PRODUCTS':
            return { ...state, produtos: action.payload.data }
        default:
            return state
    }
}