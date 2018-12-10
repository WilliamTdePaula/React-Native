import React from 'react'
import { Router, Scene, Stack } from 'react-native-router-flux';


import List from './components/List'
import PostDetails from './components/PostDetail'

const RouterComponent = () =>
    <Router>
        <Stack>
            <Scene key='list' component={List} title='Lista de Posts' initial></Scene>
            <Scene key='PostDetails' component={PostDetails} title='Detalhes do Post'></Scene>
        </Stack>
    </Router>

export default RouterComponent


