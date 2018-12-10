import React, { Component } from 'react'
import { View, FlatList, Text, ImageBackground, Dimensions, ScrollView, ToastAndroid } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import axios from 'axios'

//Telas
import ProdutoList from '../components/ProdutoList'


import TitleImage from '../assets/imgs/titleImage.png'
import ProdutoSlide from '../components/ProdutoSlide';

//Styles
import commonStyles from '../commonStyles'

//API CONEX
import { Server, showError } from '../common'


//REDUX
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, bindActionCreators } from 'redux'
import reducers from '../reducers'
import ReduxPromise from 'redux-promise'
import { selectProducts } from '../actions'


class Home extends Component {

    state = {
        produtos: [],
        produtosDestaques: []
    }

    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#027e93',
        },
        headerTitleStyle: {
            color: '#fff'
        }
    }

    destaquesFilter(res) {
        let cont = 0
        while (cont <= res.data.length) {

            if (res.data[cont].destaque == 1) {
                produtosDestaques = res.data[cont]
            } else {
                produtosDestaques = {}
            }
            cont = cont + 1
        }

        return produtosDestaques
    }


    /*loadProdutos = async () => {
        try {
            const res = await axios.post(`${Server}/produto`)
            this.setState({ produtos: res.data, produtosDestaques: res.data})
        } catch (e) {
            showError(e)
        }
    }*/

    componentDidMount() {
        this.props.selectProducts()
        this.setState({ produtos: this.props.products })
    }


    render() {
        if (!this.props.products) {
            return (<Text>Loading...</Text>)
        }


        {ToastAndroid.show(this.props.products.length+"", ToastAndroid.LONG)}

        const productsItems = this.props.products.map(products => {


            return <ProdutoList key={products.idProduto} item={products} navigation={this.props.navigation}
            ></ProdutoList>
        })

        return (

            <View style={commonStyles.container}>

                <ScrollView>

                    <ImageBackground source={TitleImage} style={commonStyles.imgTitle}>
                        <Text style={commonStyles.title}>Jogos em Destaque</Text>
                    </ImageBackground>

                    {
                        /*<Carousel ref={(c) => { this._carousel = c; }}
                            data={this.state.produtosDestaques}
                            renderItem={({ item }) => <ProdutoSlide {...item} navigation={this.props.navigation} />}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={500} layout={'stack'} layoutCardOffset={18} >
                        </Carousel>*/
                    }

                    <ImageBackground source={TitleImage} style={[commonStyles.imgTitle]}>
                        <Text style={commonStyles.title}>Nossos outros jogos</Text>
                    </ImageBackground>

                    {productsItems}

                </ScrollView>

            </View>


        )
    }
}


const mapStateToProps = (state) => {
    return { products: state.products.produtos }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ selectProducts: selectProducts }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)


