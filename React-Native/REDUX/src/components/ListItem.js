import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const ListItem = props =>

    <TouchableOpacity onPress={() => props.onItemPress(props.item.id)}>
        <Text style={styles.containerItems}>
            {props.item.title}
        </Text>
    </TouchableOpacity>


export default ListItem

const styles = StyleSheet.create({
    containerItems: {
        width: '100%', 
        height: 50, 
        textAlign: 'center', 
        borderBottomWidth: 1, 
        marginBottom: 20, 
        fontSize: 20
    }
})