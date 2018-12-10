import axios from 'axios'
import { Server } from '../common'

export const selectProducts = () => {
    
    const request = axios.post(`${Server}/produto`)

    return {
        type: 'SELECT_PRODUCTS',
        payload: request,
    }
}