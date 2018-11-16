import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity,  } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles'
import Swipeable from 'react-native-swipeable'

export default props => {
    let check = null

    //Caso tenha uma data de conclusão setada, irá ter um icone
    if(props.doneAt !== null){
        check = (//variavel recebendo um jsx (Muito Legal)
            <View style={styles.done}>{/* name é o que defini qual icone vai ser */}
                <Icon name='check' size={20} color={commonStyles.colors.secondary}/>
            </View>
        )
    }else{
        check = <View style={styles.pending}/>
    }

    const descStyle = props.doneAt !== null ?
        { textDecorationLine: 'line-through' } : {}


    const leftContent = (
        <View style={styles.exclude}>
            <Icon name='trash' size={20} color='#fff'></Icon>
            <Text style={styles.excludeText}>Excluir</Text>
        </View>
    )

    const rightContent = [
        <TouchableOpacity style={[styles.exclude, {justifyContent: 'flex-start', paddingLeft:20}]} 
            onPress={() => props.onDelete(props.id)}>
            <Icon name='trash' size={30} color='#fff'></Icon>    
        </TouchableOpacity>
    ]

    return (
        //         quando eu quero que chame o evento (apartir de q distancia)
        <Swipeable leftActionActivationDistance = {200}
            onLeftActionActivate={() => props.onDelete(props.id)/* o que ele vai fazer quando chegar na distancia acima */}
            leftContent={leftContent}//como é a interface do lado esquerdo, definido um pouco mais acima
            //não tem um evento para o lado direito pq o evento não é disparado na hra de arrastar como é feito do lado esquerdo
            rightButtons={rightContent}/*como é a interface do lado direito, definido um pouco mais acima*/>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)/* Usasse o () => pq está passando um parametro para o toggleTask */}>
                    <View style={styles.checkContainer}>{check/*Onde está o ícone*/}</View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.description, descStyle]}>
                        {props.desc}
                    </Text>
                    <Text style={styles.date}>
                        {moment(props.estimateAt).locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')}
                    </Text>
                </View>
            </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingVertical: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#aaa',
    },
    checkContainer:{
            alignItems:'center',
            justifyContent:'center',
        width:'20%',
    },
    pending:{
        borderWidth:1,
        height:25,
        width:25,
        borderRadius: 15,
        borderColor: '#555',
    },
    done:{
        height:25,
        width:25,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#4d7031'
    },
    description:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 20,
    },
    date:{
        fontFamily:commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 16,
    },
    exclude:{
        flex:1,
        backgroundColor:'red',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems: 'center',
    },
    excludeText:{
        fontFamily: commonStyles.fontFamily,
        color:"#fff",
        fontSize:20,
        margin:10,

    }
})