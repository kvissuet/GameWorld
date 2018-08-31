import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import ChatList from './ChatList';
import ChatBox from './ChatBox';
import {connect} from "react-redux";
import './ChatList.css'

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            username: this.props.auth.user.name,
            chats: []
        };
    }

    componentDidMount() {
        const pusher = new Pusher('dbe92bc6f496b1f8e3bd', {
            cluster: 'us2',
            forceTLS: true
        });
        const channel = pusher.subscribe('chat');
        channel.bind('message', data => {
            this.setState({ chats: [...this.state.chats, data], test: '' });
        });
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleTextChange = (e) => {
        if (e.keyCode === 13) {
            const payload = {
                username: this.state.username,
                message: this.state.text
            };
            axios.post('/message', payload);
            this.setState({text:""})
        } else {
            this.setState({ text: e.target.value });
        }
    }

    render() {
        return (
            <div className="chat-window">


                <ChatList chats={this.state.chats} />
                <div className={'chat-input'}>
                    <ChatBox
                        text={this.state.text}
                        username={this.state.username}
                        handleTextChange={this.handleTextChange}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(ChatRoom)
