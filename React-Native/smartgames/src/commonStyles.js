import {StyleSheet, Dimensions} from 'react-native'

const commonStyles = StyleSheet.create({
    btn:{
        width:Dimensions.get('window').width / 2,
        backgroundColor:"#005619",
        color:'#fff',
        textAlign: 'center',
        fontSize: 30,
        borderRadius:5,
    },
    imgTitle:{
        width:Dimensions.get('window').width, 
    },
    title:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:25,
        color:'#fff',
    },
    container:{flex: 1, backgroundColor:"#1e1d1d"}

})

export default commonStyles