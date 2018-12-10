import {Platform, Alert} from 'react-native'

const Server = Platform.OS === 'ios' ?
    'http://localhost:3000' : 'http://10.0.3.2:3000'

const linkSite = 'http://10.0.3.2/smartgames/'

function showError(err){
    Alert.alert('Ops!! Ocorreu um erro', `Mensagem ${err}`)
}

export {Server, showError, linkSite}