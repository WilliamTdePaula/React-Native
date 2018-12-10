import React, { Component } from 'react'
import { View, Text } from 'react-native'

//REDUX
import { connect } from 'react-redux'
import {fetchPost} from '../actions'

class PostDetail extends Component {
    componentDidMount() {
        this.props.fetchPost(this.props.postId)
    }

    render() {

        if (!this.props.post) {
            return <Text>Loading...</Text>
        }

        return (
            <View style={{ width: '100%', flex: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{this.props.post.title}</Text>
                <Text style={{ fontSize: 20 }}>{this.props.post.body}</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return { post: state.posts.selected }
}

export default connect(mapStateToProps, {fetchPost: fetchPost})(PostDetail)