import React from 'react';
import { View, Text } from 'react-native';
import Padrao from '../estilo/Padrao';

//export default function(props){
  //  return <Text>Simples! {props.texto}</Text>
//}

//OU

/*export default (props) => {
    return <Text>ArrowFunction: Simples! {props.texto}</Text>
}*/

//OU

export default props => <Text style={[Padrao.ex]}>ArrowFunction: Simples! {props.texto}</Text>

//OU MAIS DE UM  (DEVE SER IMPORTADO O VIEW)

/*export default props =>
    <View>
        <Text> {props.texto} </Text>
        <Text> UAAAAAAAU </Text>
    </View>
*/

//OU USANDO ARRAY (SEM RETURN)

/*export default props => [
    <Text key={1}>ArrowFunction 1 {props.texto}</Text>,
    <Text key={2}>ArrowFunction 2 {props.texto}</Text>
]*/

//OU USANDO ARRAY (COM RETURN)

/*export default props => {
    return [
        <Text key={1}>ArrowFunction 1 {props.texto1}</Text>,
        <Text key={2}>ArrowFunction 2 {props.texto2}</Text>
    ]
}*/

