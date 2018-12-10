import React, { Component } from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native'
import commonStyles from '../commonStyles'

export default class ModalDetalhes extends Component {

    abrirLojas = () =>{
        this.props.onCancel(true)
        this.props.navigation.navigate('Lojas',{idProduto: this.props.idProduto})
    }

    render() {
        return (
            <Modal onRequestClose={this.props.onCancel} 
                visible={this.props.isVisible}
                animationType='slide' 
                transparent={true}>

                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.nothing}></View>
                </TouchableWithoutFeedback>

                <View style={styles.containerModal}>

                    <Text style={styles.nomeJogo}>{this.props.nome}</Text>

                    <ScrollView>

                        <View>
                            <Text style={styles.desc}>{this.props.detalhe}</Text>
                        </View>
                        
                        <TouchableOpacity onPress={this.abrirLojas}>
                            <Text style={[commonStyles.btn, {marginLeft:200, marginTop:20}]}>Comprar</Text>
                        </TouchableOpacity>

                    </ScrollView>

                </View> 

                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.nothing}></View>
                </TouchableWithoutFeedback>
                
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    containerModal:{
        flex:1,
        backgroundColor: '#5c5e60',
        padding:5,
    },
    nomeJogo:{
        fontSize:20,
        fontWeight:'bold',
        borderBottomWidth:1,
        color:'#FFF',
    },
    desc:{
        fontSize:18,
        color:'#fff',
        textAlign: 'justify',
        marginTop:20,
    },
    nothing:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    }
})