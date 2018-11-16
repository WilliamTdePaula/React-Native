import React, { Component } from 'react'
import {
    Modal, View, Text, TextInput,
    DatePickerIOS, DatePickerAndroid, 
    Platform, StyleSheet,
    TouchableWithoutFeedback, TouchableOpacity,
    Alert
} from 'react-native'

import moment from 'moment'
import commonStyles from '../commonStyles'

//const initialState = { desc: '', date: new Date() }

export default class AddTask extends Component {
    //state = { ...initialState }//clonando o initialState

    constructor(props){//o construtor sempre irá cria um estado vazio
        super(props)
        this.state = this.getInitialState()//criando um estado que recebo o getInitialState
    }    

    getInitialState = () =>{//ela sempre ira retornar um objeto como se fosse o initialState
        return {
            desc: '',
            date: new Date()
        }
    }

    save = () => {
        if(!this.state.desc.trim()){
            Alert.alert('Dados Inválidos', 'Informe um descrição para tarefa')
            return//não vai mais enviar os dados
        }
        const data = { ...this.state }//clonando o state que está clonando o initialState
        this.props.onSave(data)//uma função que vamos receber qnd chamar AddTask
        //this.setState({ ...initialState })
    }

    handleDateAndroidChanged = () =>{
        DatePickerAndroid.open({
            date: this.state.date
        }).then(e =>{
            //se o usuario não ignorou a mudança da data (não cancelou)
            if(e.action !== DatePickerAndroid.dismissedAction){
                const momentDate = moment(this.state.date)
                momentDate.date(e.day)
                momentDate.month(e.month)
                momentDate.year(e.year)
                this.setState({date: momentDate.toDate()})//transformando a data do moment em uma data pura do js
            }
        })
    }

    render() {
        let datePicker = null
        if(Platform.OS === 'ios'){
            datePicker = <DatePickerIOS mode='date' date={this.state.date}
            onDateChange={date => this.setState({ date })} />
        }else{
            datePicker = (
                <TouchableOpacity onPress={this.handleDateAndroidChanged}>
                    <Text style={styles.date}>
                        {moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')}
                    </Text>
                </TouchableOpacity>
            )
        }
        return (
            <Modal onRequestClose={this.props.onCancel}/*quando for fechar*/
                visible={this.props.isVisible} animationType='slide' transparent={true} onShow={() => this.setState({...this.getInitialState()})}>
                {/* O que vai ter dentro da modal */}
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa!</Text>
                    <TextInput placeholder='Descrição...' style={styles.input}
                        onChangeText={desc => this.setState({ desc }) /*'o primeiro desc é o q o usuario está digitando e está enviando para o desc do state'*/}
                        value={this.state.desc}/>
                    
                    {datePicker}

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}


var styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        justifyContent:"space-between"
    },
    offset:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.7)',//3 primeiros zeros a cor, ultimo é transparencia
    },
    button:{
        margin:20,
        marginRight:30,
        color: commonStyles.colors.default,
    },
    header:{
        fontFamily:commonStyles.fontFamily,
        backgroundColor:commonStyles.colors.default,
        color: commonStyles.colors.secondary,
        textAlign:'center',
        padding:15,
        fontSize:15,
    },
    input:{
        fontFamily:commonStyles.fontFamily,
        width:'90%',
        height:40,
        marginTop:10,
        marginLeft:10,
        backgroundColor:'white',
        borderWidth:1,
        borderColor: '#e3e3e3',
        borderRadius:6,
    },
    date:{
        fontFamily:commonStyles.fontFamily,
        fontSize: 20,
        marginLeft:10,
        marginTop:10,
        textAlign:'center',
    }
})