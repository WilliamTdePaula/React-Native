//todos os actions creator aqui
import axios from 'axios'

const REQUEST_URL = 'https://jsonplaceholder.typicode.com'
export const fetchPosts = () => {
    //fazer pedido http para obter todos os posts
    const request = axios.get(`${REQUEST_URL}/posts`)

    //depois, despachar action com os dados dos posts
    return {
        type: 'FETCH_POSTS',
        payload: request //promise
    }
}

export const fetchPost = (id) => {
    //FAZ PEDIDO HTTP
    const request = axios.get(`${REQUEST_URL}/posts/${id}`)

    //retorna a ação
    return{
        type:'FETCH_POST',
        payload: request
    }
}