import React, {Component} from 'react'
import {View, Text, TextInput} from 'react-native'
import Padrao from '../estilo/Padrao'

export default class Evento extends Component{
    state={
        texto: ''//se iniciar com null será um componente não controlado, logo não será redenrizado novamente a tela
    }

    alterarTexto = texto =>{
        this.setState({texto})//recebo texto como parametro e o nome do objeto do estado é texto entao escrevo apenas texto
    }

    render(){
        return(
            <View>
                <Text style={Padrao.font40}>
                    {this.state.texto}
                </Text>
                <TextInput value={this.state.texto} 
                    style={Padrao.input} 
                    onChangeText={this.alterarTexto}>
                </TextInput>
            </View>
        )
    }
}