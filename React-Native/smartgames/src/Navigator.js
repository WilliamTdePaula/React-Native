import React from 'react'
import {StackNavigator} from 'react-navigation'
//Telas
import App from './App'
import Home from './screens/Home'
import Lojas from './screens/Lojas'

const MainRoutes = {
    App:{
        name: 'App',
        screen: App,
        
    },
    Home:{
        name: 'Home',
        screen: Home,
        
    },
    Lojas:{
        name: 'Lojas',
        screen: Lojas,
    },
}

const MainNavigator = StackNavigator(MainRoutes, {initialRouteName: 'App'})

export default MainNavigator