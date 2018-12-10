import React from "react";

import { Provider } from "react-redux";

import reducers from './reducers'
import ReduxPromise from 'redux-promise'
import { createStore, applyMiddleware, bindActionCreators } from 'redux'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)
const store = createStoreWithMiddleware(reducers)

import Home from './screens/Home'

export default App = () =>
    <Provider store={store}>
        <Home></Home>
    </Provider>