import { Alert, Platform } from 'react-native'

//link para acessar a API dependendo da plataforma
const server = Platform.OS === 'ios' ?
    'http://localhost/3000' : 'http://10.0.3.2:3000'

function showErr(err) {
    Alert.alert('Ops! ocorreu um Problema', `Mensagem: ${err}`)
}

export { server, showErr }