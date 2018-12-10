import React, {Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, Image } from 'react-native'

//Links
import {linkSite} from '../common'

//Estilos
import commonStyles from '../commonStyles'

//Telas
import ModalDetalhes from '../screens/ModalDetalhes'

export default class ProdutoList extends Component {

    state = {
        modalShow: false,
    }

    render(){
        return (
            <View style={styles.container}>
                <ModalDetalhes {...this.props.item} isVisible={this.state.modalShow} 
                    onCancel={() => this.setState({ modalShow: false })} navigation={this.props.navigation}>
    
                </ModalDetalhes>
    
                <View style={styles.imgContainer}>
    
                    <Image source={{ uri : linkSite + this.props.item.imagem}} style={styles.imgProduto}></Image>
                </View>
    
                <View>
                    <Text style={styles.nomeProduto}>{this.props.item.nome}</Text>
                </View>
    
                <View style={styles.precoDetalhes}>
    
                    <Text style={styles.preco}>{this.props.item.valor}</Text>
    
                    <TouchableOpacity onPress={() => this.setState({modalShow: true})}>
                        <Text style={commonStyles.btn}>Detalhes</Text>
                    </TouchableOpacity>
    
                </View>
    
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomWidth: 1,
        padding:20,
    },
    imgContainer: {
        flex: 2,
        alignItems: 'center',
    },
    imgProduto: {
        width: 300,
        height: 400,
    },
    nomeProduto: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold'
    },
    precoDetalhes: {
        width: "100%",
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end'
    },
    preco: {
        fontSize: 25,
        color: '#099934',
        fontWeight: 'bold',
    },

})