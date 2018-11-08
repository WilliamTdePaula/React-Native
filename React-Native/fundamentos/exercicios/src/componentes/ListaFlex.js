import React from 'react'
import { ScrollView, View, FlatList, Text } from 'react-native'

const alunos = [
    {id: 1, nome: "João", nota: 7.9},
    {id: 2, nome: "Gabiel", nota: 8},
    {id: 3, nome: "Dan", nota: 3},
    {id: 4, nome: "Mat", nota: 5.3},
    {id: 11, nome: "João", nota: 7.9},
    {id: 21, nome: "Gabiel", nota: 8},
    {id: 33, nome: "Dan", nota: 3},
    {id: 44, nome: "Mat", nota: 5.3},
]

const itemEstilo = {//Um objeto porem servira como parametro para o style
    paddingHorizontal: 15,
    height: 70,
    backgroundColor: "#ddd",
    borderWidth: 0.5,
    borderColor: "#222",

    //flex
    alignItems: "center",
    justifyContent: 'space-around',
    flexDirection: 'row',

}

export const Aluno = props =>
    <View style={itemEstilo}>
        <Text>Nome: {props.nome}</Text>
        <Text style={{fontWeight:"bold"}}>Nota: {props.nota}</Text>
    </View>

export default props => {
    const renderItem = ({ item }) => {
        return <Aluno {...item}/>
    }

    return (
        <ScrollView>
            <FlatList data={alunos} renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}></FlatList>
        </ScrollView>
    )
}