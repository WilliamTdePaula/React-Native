import React from 'react'
import { View, Text, FlatList } from 'react-native'
import List from './components/List'

//REDUX
import { Provider } from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reducers from './reducers'
import ReduxPromise from 'redux-promise'
import Router  from './Router'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)
const store = createStoreWithMiddleware(reducers)

const App = () =>
    <Provider store={store}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Router></Router>
        </View>
    </Provider>



export default App