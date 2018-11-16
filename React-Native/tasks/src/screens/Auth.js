import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Alert,
    AsyncStorage,
} from 'react-native'
import axios from 'axios'
import {server, showError} from '../common'
import AuthInput from '../components/AuthInput'
import commonStyles from '../commonStyles'
import backgroundImage from '../../assets/imgs/login.jpg'//colocando essa imagem como background

export default class Auth extends Component {
    state = {
        stageNew: false,//se estiver true, está na tela de cadastro, se estiver false, está na tela de login
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    signin = async () => {//API logar
        try{
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password
            })

            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}` //PEGAR O TOKEN

            AsyncStorage.setItem('userData', JSON.stringify(res.data))
            //passando os dados para o navigator e sendo acessados em Menu.js
            this.props.navigation.navigate('Home', res.data)//entrar na tela home, definido no arquivo Navigator
        }catch(err){
            Alert.alert('Erro', 'Falha ao logar!' + err)
        }     
    }

    signup = async () => {//API cadastrar
        try{
            //acessando a API para SE CADASTRAR
            await axios.post(`${server}/signup`, {
                nome: this.state.name,
                email: this.state.email,
                senha: this.state.password,
                confirmPassword: this.state.confirmPassword,
            })

            Alert.alert('Sucesso!', 'Usuário foi cadastrado com sucesso')
            this.setState({stageNew: false})

        }catch(err){
            showError(err)
        }
    }

    //decidi se mostra tela de login ou de cadastro
    signinOrSignup = /*async*/ () => {
        if (this.state.stageNew) {//se true é a tela de cadastro
            this.signup()
        } else {//acessando a API PARA LOGAR
            this.signin()
                
        }
    }

    render() {
        const validations = []

        //as duas validações devem serão utilizadas tanto pro stageNew =false e true
        validations.push(this.state.email && this.state.email.includes('@'))//tem que ter algo no email e tem que ter o @
        validations.push(this.state.password && this.state.password.length >= 6)

        //tela de cadastro
        if(this.state.stageNew){
            validations.push(this.state.name && this.state.name.trim())//se tem algo dentro e se n tem apenas espaços em branco
            validations.push(this.state.confirmPassword)
            validations.push(this.state.password == this.state.confirmPassword)
        }
    
        const validForm = validations.reduce((all, v) => all && v)//verfica todas as validações, uma por uma, e só funciona se todas estiverem certas
        
        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>Task</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? "Crier sua conta" : 'Informe seus dados'}
                    </Text>
                    {/* TEXTO DE NOME */}
                    {this.state.stageNew &&//é uma expressão que verifica se é verdadeiro, se for ele renderiza o <AuthInput>
                        <AuthInput icon='user' placeholder='Nome' style={styles.input} value={this.state.name}
                            onChangeText={name => this.setState({ name })}></AuthInput>}

                    {/*apartir daqui ele renderiza tudo normalmente*/}
                    <AuthInput icon='at' placeholder='E-mail' style={styles.input} value={this.state.email}
                        onChangeText={email => this.setState({email}) }></AuthInput>

                    <AuthInput icon='lock' secureTextEntry={true} placeholder='senha' style={styles.input} 
                    value={this.setState.password} onChangeText={password => this.setState({password})}></AuthInput>
                   
                    {/*confirmação de senha*/}
                    {this.state.stageNew && 
                        <AuthInput icon='asterisk' secureTextEntry={true} placeholder='Confirmação' style={styles.input} 
                        value={this.state.confirmPassword} onChangeText={confirmPassword => this.setState({confirmPassword})}></AuthInput>}

                    {/* BOTÃO DE LOGIN OU CADASTRO */}
                    <TouchableOpacity disabled={!validForm}
                         onPress={this.signinOrSignup}>
                        <View style={[styles.button, !validForm ? { backgroundColor: "#AAA" } : {}]}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? "Registrar" : "Entrar"/* DEPENDENDO DP STAGENEW É UM TEXTO DIFERENTE */}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{padding: 10}} 
                    onPress={() => this.setState({
                        stageNew: !this.state.stageNew
                    })}>

                    <Text style={styles.buttonText}>
                        {this.state.stageNew ? 'Já possui conta?' : "Ainda não possui conta?"}
                    </Text>
                
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontFamily: commonStyles.fontFamily,
        color: '#fff',
        fontSize: 70,
        marginBottom:10,
    },
    subtitle:{
        fontFamily: commonStyles.fontFamily,
        color: "#FFF",
        fontSize: 20,
    },
    formContainer:{
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding:20,
        width:'90%',
    },
    input:{
        marginTop:10,
        backgroundColor:'#FFF',
    },
    button:{
        backgroundColor: '#080',
        marginTop: 10,
        padding:10,
        alignItems:'center',
    },
    buttonText:{
        fontFamily:commonStyles.fontFamily,
        color:'#fff',
        fontSize:20,
    }


})