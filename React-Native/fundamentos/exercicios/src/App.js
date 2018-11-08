import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Simples from './componentes/Simples'
import ParImpar from './componentes/ParImpar'
import { Inverter, MegaSena } from './componentes/Multi'

export default class App extends Component{
  render(){
    return(
      <View style={style.container}>
        <Text style={style.f20}>App!</Text>

        <Simples texto1 = "Incrivel!!" texto2 = "Incrivel!!"/>

        <ParImpar numero={31} />

        <Inverter texto = 'Hello World'/>

        <MegaSena numeros={2}></MegaSena>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  f20:{
    fontSize:20,
  },

})
