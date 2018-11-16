import React, { Component } from 'react'
import {
    Text, View, StyleSheet,
    ImageBackground, FlatList,
    TouchableOpacity, Platform,
    AsyncStorage, ToastAndroid
} from 'react-native'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'//formatar as datas no padrão br como se fosse o charset utf-8
import commonStyles from '../commonStyles'
import Task from '../components/Task'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'//deve-se baixar na pasta pelo cmd
import AddTask from './AddTask'
import { server, showError } from '../common'

import todayImage from '../../assets/imgs/today.jpg'
import tomorrowImage from '../../assets/imgs/tomorrow.jpg'
import weekImage from '../../assets/imgs/week.jpg'
import monthImage from '../../assets/imgs/month.jpg'

export default class Agenda extends Component {

    state = {
        tasks: [
            /*{
                id: Math.random(), desc: 'Comprar curso de React-native',
                estimateAt: new Date(), doneAt: new Date()
            },
            {
                id: Math.random(), desc: 'Concluir o curso',
                estimateAt: new Date(), doneAt: null
            },
            {
                id: Math.random(), desc: 'Comprar curso de React-native',
                estimateAt: new Date(), doneAt: new Date()
            },
            {
                id: Math.random(), desc: 'Concluir o curso',
                estimateAt: new Date(), doneAt: null
            },
            {
                id: Math.random(), desc: 'Comprar curso de React-native',
                estimateAt: new Date(), doneAt: new Date()
            },
            {
                id: Math.random(), desc: 'Concluir o curso',
                estimateAt: new Date(), doneAt: null
            },
            {
                id: Math.random(), desc: 'Comprar curso de React-native',
                estimateAt: new Date(), doneAt: new Date()
            },
            {
                id: Math.random(), desc: 'Concluir o curso',
                estimateAt: new Date(), doneAt: null
            },*/


        ],
        visibleTasks: [],
        showDoneTasks: true,
        showAddTask: false,
    }

    addTask = async task => {
        /*const tasks = [...this.state.tasks]
        tasks.push({//é como se fosse um insert
            id: Math.random(),
            desc: task.desc,
            date: task.date,
            doneAt: null
        })

        this.setState({ tasks, showAddTask: false }, this.filterTasks)*/
        try{
            await axios.post(`${server}/tasks`,{
                desc: task.desc,
                estimateAt: moment(task.date).format('YYYY-MM-DD'),                
            })
            this.setState({showAddTask: false}, this.loadTasks)//esconder modal
        }catch(e){
            ToastAndroid.show(e+"", ToastAndroid.LONG)
        }
    }

    deleteTask = async id =>{
        /*const tasks = this.state.tasks.filter(task => task.id !== id)
        this.setState({ tasks }, this.filterTasks)*/

        try{
            await axios.delete(`${server}/tasks/${id}`)
            this.loadTasks()
        }catch(e){
            showError(e)
        }

    }

    filterTasks = () => {
        let visibleTasks = null
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }
        this.setState({ visibleTasks })
        //AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks))//pegando as tasks, transformando em string e passando para dentro do primeiro parametro 'tasks'
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }
            , this.filterTasks)
    }

    componentDidMount = async () => {//carrega assim que for renderizado
        /*const data = await AsyncStorage.getItem('tasks')//msm nome q esta no setItem do asyncStorage
        const tasks = JSON.parse(data) || [] //o data nçao pode ser vazio, se for vazio ele recebe []
        this.setState({ tasks }, this.filterTasks)//por ser assíncrono o setState, ele primeiro seta o tasks dps chama o filterTasks
        */
       this.loadTasks()
    }

    //ESSA FUNÇÃO SERÁ USADA COMO PARAMÊTRO PARA <Task>
    toggleTask = async id => {
        /*const tasks = [...this.state.tasks]//Clonando o tasks (array Original logo acima) para não mexer no array Original
         tasks.forEach(task =>{
             if(task.id === id){
                 task.doneAt = task.doneAt ? null : new Date()
             }
         })
         this.setState({tasks})*/

        //Ou

        /*const tasks = this.state.tasks.map(task => {
            if (task.id === id) {
                task = { ...task }
                task.doneAt = task.doneAt ? null : new Date()
            }
            return task
        })*/

        try{
            await axios.put(`${server}/tasks/${id}/toggle`)
            await this.loadTasks()//puxando dotas as tasks
        }catch(e){
            showError(e)
        }
    }

    loadTasks = async () => {
        try{ /*                       quandtidades de dias a frente      */
            const maxDate = moment().add({days: this.props.daysAhead}).format('YYYY-MM-DD 23:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({ tasks: res.data }, this.filterTasks)
        }catch (e) {
            showError(e)
        }
    }

    render() {
        let styleColor = null
        let image = null

        switch(this.props.daysAhead){
            case 0:
                styleColor = commonStyles.colors.today
                image = todayImage
                break
            case 1:
                styleColor = commonStyles.colors.tomorrow
                image = tomorrowImage
                break
            case 7:
                styleColor = commonStyles.colors.week
                image = weekImage
                break
            case 30:
                styleColor = commonStyles.colors.month
                image = monthImage
                break
        }


        return (
            <View style={styles.container}>

                <AddTask isVisible={this.state.showAddTask} onSave={this.addTask} onCancel={() => this.setState({ showAddTask: false })}></AddTask>
               
                <ImageBackground source={image} style={styles.background}>

                    <View style={styles.iconBar}>

                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()/* Botão para abrir o menu */}>
                            <Icon name='bars' size={20} color={commonStyles.colors.secondary} ></Icon>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={20} color={commonStyles.colors.secondary} />
                        </TouchableOpacity>

                    </View>

                    <View style={styles.titleBar}>

                        <Text style={styles.title}>{this.props.title}</Text>

                        <Text style={styles.subtitle}>
                            {moment().locale('pt-br').format('ddd, D [de] MMMM')}
                        </Text>

                    </View>

                </ImageBackground>

                <View style={styles.taskContainer}>

                    <FlatList data={this.state.visibleTasks} //os dados para a flatlist é o task dentro do state
                        keyExtractor={item => `${item.id}`} //gerando uma chave para o item (as tasks)
                        renderItem={({ item }) => <Task {...item} onToggleTask={this.toggleTask} onDelete={this.deleteTask}></Task>/* renderizar o item dentro da <Task/> */}></FlatList>
                    {/* NO TASK.JS É NCESSARIO PASSAR UM PARAMETRO CAHAMADO TOGGLETASK POR ESSE MOTIVO SE PASSA O TOGGLETASK RECEBENDO UMA FUNCAO TOGGLETASK PQ ESSA FUNÇÂO É A AÇÃO DO PARAMETRO */}
                
                </View>

                <ActionButton buttonColor={styleColor}
                    onPress={() => { this.setState({ showAddTask: true }) }}
                ></ActionButton>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 3,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 10,

    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    taskContainer: {
        flex: 7,
    },
    iconBar: {
        marginTop: Platform.OS === 'ios' ? 30 : 10, //pode ser feito uma condição no 'css' QUE DAORAAAAAAAAAAA
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})