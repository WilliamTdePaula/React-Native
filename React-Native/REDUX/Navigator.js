import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import App from './src/App'
import PostDetail from './src/components/PostDetail'

const MainRoutes = {
    App: {
        name: 'App',
        screen: App,
        navigationOptions: {
            title: 'App',
        }
    },
    PostDetail:{
        name:'PostDetail',
        screen:PostDetail,
        navigationOptions:{
            title:'PostDetail'
        }
    }
}

const MainNavigator = createStackNavigator(MainRoutes, {initialRouteName:'App'})

const AppContainer = createAppContainer(MainNavigator)

export default AppContainer

