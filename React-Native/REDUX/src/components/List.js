import React, { Component } from 'react'
import { View, Text, ScrollView, ToastAndroid } from 'react-native'
import ListItem from './ListItem';
import { Actions } from 'react-native-router-flux'

//REDUX
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPosts } from '../actions'

class List extends Component {
    componentDidMount() {
        //chama action creator para pegar os dados da lista
        this.props.fetchPosts()//nome do action createor será fetchPosts, poderia ser qualquer coisa

    }

    onItemPress(id) {
        Actions.PostDetails({ postId: id })
    }

    render() {

        if (!this.props.posts) {
            return (
                <Text>Loading...</Text>
            )
        }

        const postItems = this.props.posts.map(post => {

            ToastAndroid.show(post.id + "", ToastAndroid.SHORT)
            return <ListItem key={post.id} item={post} navigation={this.props.navigation}
                onItemPress={this.onItemPress}></ListItem>
        })

        return (
            <View>

                <ScrollView styles={{ width: '100%' }}>
                    {postItems}
                </ScrollView>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return { posts: state.posts.all }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchPosts: fetchPosts }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(List)