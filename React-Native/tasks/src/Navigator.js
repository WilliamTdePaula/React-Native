import React from 'react'
import {createSwitchNavigator, createDrawerNavigator} from 'react-navigation'
import Agenda from './screens/Agenda'//Tela Principal
import Auth from './screens/Auth'//Tela de autenticação
import commonStyles from './commonStyles'
import Menu from './screens/Menu'
import AuthOrApp from './screens/AuthOrApp'

//criando caminhos dos menus
const MenuRoutes = { 
    Today: {
        name: 'Today',
        screen: props => <Agenda title="Hoje" daysAhead={0} {...props}/>,
        navigationOptions:{
            title: "Hoje",
        }
    },
    Tomorrow: { 
        name: 'Tomorrow',
        screen: props => <Agenda title="Amanhã" daysAhead={1} {...props}/>,
        navigationOptions: {title: "Amanhã"}
    },
    Week: { 
        name: "Week",
        screen: props => <Agenda title='Semana' daysAhead={7} {...props}/>,
        navigationOptions: {title: 'Semana'}

    },
    Month:{
        name: 'Month',
        screen: props => <Agenda title='Mês' daysAhead={30} {...props}/>,
        navigationOptions:{title: 'Mês'}
    }
}

//configuração do menu
const MenuConfig ={
    initialRouteName:'Today',
    contentComponent: Menu,//passando menu personalizado
    contentOptions:{
        labelStyle: {
            fontFamily: commonStyles.fontFamily,
            fontWeight: 'normal',
            fontSize: 20,
        },
        activeLabelStyle:{
            color: "#080",
        }
    }
}

//criando o navegador do DRAWER
const MenuNavigator = createDrawerNavigator(MenuRoutes, MenuConfig)

//criando caminhos das telas
const MainRoutes = {
    Loading:{
        name: 'Loading',
        screen: AuthOrApp
    },
    Auth:{
        name: 'Auth',
        screen: Auth,
    },
    Home:{
        name:'Home',
        screen: /*Agenda*/MenuNavigator/* Como o MenuNavigator vai possuir agenda dentro dele passamos ele diretamente */
    }
}

const MainNavigator = createSwitchNavigator(MainRoutes, {initialRouteName: 'Loading'})//Vai chamar o loading que verifica qual tela entrar, Home ou Auth

export default MainNavigator