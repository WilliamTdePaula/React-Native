import React from 'react'
import {View, Text} from 'react-native'

const fonte = { style:{fontSize: 30}}

function filhoComProps(props){
    return React.Children.map(props.children,
        c => React.cloneElement(c/*c é o map*/, {...props/*proprioedades do pai*/, ...c.props/*propriedades do filho*/}))
}

export const Filho = props =>
    <View>
        <Text {...fonte}>
            Filho: {props.nome} {props.sobrenome}
        </Text>
    </View>

export const Pai = props =>
    <View>
        <Text {...fonte}>
            Pai: {props.nome} {props.sobrenome}
        </Text>
        {/*props.children*/}
{/*React.cloneElement(props.children, {...props, ...props.children.props})*Clonando as propriedades de cada um, apenas para um filho*/}
        {filhoComProps(props)}
    </View>

export const Avo = props =>
    <View>
        <Text {...fonte}>
            Avô: {props.nome} {props.sobrenome}
        </Text>
        <Pai nome='André' sobrenome={props.sobrenome}>
            <Filho nome='Ana' ></Filho>
            <Filho nome='Gab' ></Filho>
        </Pai>
        <Pai {...props} nome='Pedro'/*vai herdar tudo do avô, mas o nome foi reescrito, se não seria o nome do avô*/>
            <Filho nome='Rebeca'></Filho> 
            <Filho nome='Caio'></Filho>  

        </Pai>
    </View>