import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Platform,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

class Header extends Component {
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                <Icon name='bars' size={20} style={{color:"#fff"}} />
                    <Text style={styles.title}>Smart Games</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#1e1d1d',
        backgroundColor:'#0f0f0f'
    },
    rowContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    title:{
        color:"#fff",
        height: 30,
        fontSize: 28,
        fontFamily: 'HelloMozza',
    }
})


export default Header