import React, {Component} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import ModalDetalhes from '../screens/ModalDetalhes'

import commonStyles from '../commonStyles'

//Links
import {linkSite} from '../common'

export default class ProdutoSlide extends Component{
    state = {
        modalShow: false,
    }
    render(){
        return(
            
            <View style={styles.container}>
                <ModalDetalhes {...this.props} isVisible={this.state.modalShow} 
                    onCancel={() => this.setState({ modalShow: false })} navigation={this.props.navigation}>

                </ModalDetalhes>

                <View style={styles.imgContainer}>

                    <Image source={{uri: linkSite + this.props.imagem}} style={styles.imgProduto}></Image>

                </View>

                <View style={styles.containerButtonImg}>
                    <View>
                        <Text style={styles.nomeProduto}>{this.props.nome}</Text>
                    </View>

                    <View style={styles.precoDetalhes}>

                        <Text style={styles.preco}>{this.props.valor}</Text>

                        <TouchableOpacity onPress={() => this.setState({modalShow: true})}>
                            <Text style={commonStyles.btn}>Detalhes</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        )
    }
} 

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        height:301,
        backgroundColor:"#027e93",
        width:380,
        marginLeft: 20,
        marginTop:10,
        borderRadius:10,
    },
    imgContainer: {
        alignItems:'center',
        width: "100%",
        height:200,
        borderBottomWidth:1,
    },
    imgProduto: {
        width:150,
        height: 200,
    },
    nomeProduto: {
        fontSize: 30,
        color: '#000',
        fontWeight: 'bold',
        marginLeft:15,
    },
    precoDetalhes: {
        width: "100%",
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
    },
    preco: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    containerButtonImg:{
        backgroundColor:'#edefef',
    }

})