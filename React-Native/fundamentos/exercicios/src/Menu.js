import React from 'react'
import { createDrawerNavigator } from 'react-navigation'

import Simples from './componentes/Simples'
import ParImpar from './componentes/ParImpar'
import { Inverter, MegaSena } from './componentes/Multi'
import Contador from './componentes/Contador'
import Plataformas from './componentes/Plataforma'
import ValidarProps from './componentes/ValidarProps'
import Eventos from './componentes/Eventos'
import Calculadora from './componentes/Calculadora'
import { Avo } from './componentes/ComunicaçãoDireta'
import { TextoSincronizado } from './componentes/ComunicaçãoIndireta'
import ListaFlex from './componentes/ListaFlex'
import Flex from './componentes/Flex'

export default createDrawerNavigator({

    /*Calculadora:{
        screen: () => <Calculadora/>
    },*/

    Flex:{
        screen: () => <Flex/>,
    },

    ListaFlex:{
        screen: () => <ListaFlex/>,
        navigationOptions: {title:'Lista Alunos (Flex Box)'}
    },

    TextoSincronizado:{
        screen: () => <TextoSincronizado/>,
        navigataionOptions: {title:"Texto Sincronizado"}
    },

    Avo:{
        screen: () => <Avo nome='João' sobrenome = 'Silva'/>
    },

    Eventos:{
        screen: () => <Eventos/>
    },

    ValidarProps:{
        screen: () => <ValidarProps ano={18}/>
    },

    Plataformas:{
        screen: () => Plataformas
    },

    Contador:{
        screen: () => <Contador numero={2}/>
    },

    MegaSena:{
        screen: () => <MegaSena numeros={8} />,
        navigationOptions: {title: 'Mega Sena'},
    },
    Inverter: {
        screen: () => <Inverter texto = "React-Native"/>,
    },
    ParImpar:{
        screen: () => <ParImpar numero={30}/>,
        navigationOptions: {title: 'Par & Impar'},
    },
    Simples:{
        screen: () => <Simples texto1 = "Incrivel!!" texto2 = "Incrivel!!"/>, 
    }
}, {drawerWidth: 300})

