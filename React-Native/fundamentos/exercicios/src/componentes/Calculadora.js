import React, {Component} from 'react'
import {View, Text, TextInput, Button} from 'react-native'
import Padrao from '../estilo/Padrao'

export default class Calculadora extends Component{
    state = {
        conta:'',
        resultado:''
    }

    alterarConta = conta =>{
        this.setState({conta})//atualizando o state com o parametro conta
    }

    calcular = conta => {
        const array = conta.split('')
        const num1 = array[0]
        const sinal = array[1]
        const num2 = array[2]
        let calculo = parseInt(num1) + parseInt(num2)
        this.setState({resultado: calculo})
    }

    render(){
        return(
            <View> 
                <Text style={{fontSize:50, fontWeight:"bold"}}>
                    Calculadora
                </Text>
                <Text style={Padrao.font40}>
                    {this.state.resultado}
                </Text>
                
                <TextInput value={this.state.conta} 
                    style={Padrao.input}
                    onChangeText={this.alterarConta}
                >
                
                </TextInput>
                
                <Button title="asd"
                    onPress={this.calcular}
                >

                </Button>
            </View>
        )
    }
}