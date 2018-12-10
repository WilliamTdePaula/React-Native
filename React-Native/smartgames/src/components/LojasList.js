import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, ToastAndroid } from 'react-native'

export default class LojaList extends Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={null}>
                <View style={styles.container}>
                    <Text style={styles.local}>{this.props.bairro}, {this.props.cidade} - {this.props.estado}</Text>
                    {/*ToastAndroid.show(this.props.bairro + "", ToastAndroid.LONG)*/}
                    <Text style={styles.estoque}>Estoque: 20</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#202021',
        height: 70,
        padding: 10,
        marginTop: 20,
    },
    local: {
        flex: 2,
        borderRightWidth: 1,
        borderColor: '#fff',
        fontSize: 20,
        color: "#fff",
        fontWeight: 'bold',
        textAlign: 'center',
    },
    estoque: {
        flex: 1,
        marginLeft: 10,
        fontSize: 20,
        color: "#fff",
        fontWeight: 'bold',
    },

})