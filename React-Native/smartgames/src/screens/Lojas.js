import React, { Component } from 'react'
import { View, Text, FlatList, ImageBackground, ToastAndroid } from 'react-native'
import axios from 'axios'

//links
import {Server, ShowError} from '../common'

//Styles
import commonStyles from '../commonStyles'

//IMG
import TitleImage from '../assets/imgs/titleImage.png'

//Componentes
import LojasList from '../components/LojasList'

export default class Lojas extends Component {
    state = {
        lojas: [],
        lojasIds: [],
        cont: 0,
    }
    
    getLojas = async (id) =>{
        const resIds = await axios.get(`${Server}/loja?idProduto=${id}`)

        let cont = 0

        while(cont <= resIds.data.length){
            let lojas = await axios.post(`${Server}/loja`, {
                idLoja: resIds.data[cont].idLoja
            })
            
            atualEstado = {...this.state}
           
            this.setState({lojas: [...this.state.lojas, lojas.data]})

            cont++
        } 
    }

    componentDidMount = async () =>{      
        const params = this.props.navigation.getParam('idProduto', 0)
        this.getLojas(params)
        
        ToastAndroid.show(this.state.lojas.length+"", ToastAndroid.LONG)   
    }

    render() {
        return (
            <View style={commonStyles.container}>
                <ImageBackground source={TitleImage} style={commonStyles.imgTitle}>
                    <Text style={commonStyles.title}>Nossas Lojas</Text>
                </ImageBackground>
            
                <FlatList data={this.state.lojas} 
                    keyExtractor={item => `${item.id}`}
                    renderItem={({item}) => <LojasList {...item}></LojasList>}>

                </FlatList>
            </View>
        )
    }
}
