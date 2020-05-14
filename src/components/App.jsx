import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import UsersWindow from './users-window/UsersWindow';
import ChatWindow from './chat-window/chatWindow';
import LoginWindow from './login-window/LoginWindow';
import { setUser } from './../actions/setUser';
import { getUsers } from './../actions/getUsers';
import { recieveMessages } from './../actions/recieveMessages';
import './App.css'
import { checkNew } from './../actions/checkNew';
import { removeFromNew } from './../actions/removeFromNew';


function App(props) {
    let { socket, setUser, getUsers, recieveMsg, checkNew, target, removeNew, newMsg } = props


    useEffect(() => {
        socket.on('urUserData', e => {
            setUser(e)
        })
        socket.on('usersData', e => {
            getUsers(e)
        })
        socket.on('send messages', e => {
            recieveMsg(e)
            checkNew(e)
        })
        socket.on('msgHistory', e => recieveMsg(e))
    }, [socket, setUser, getUsers, recieveMsg, checkNew])


    useEffect(() => {
        if(target === newMsg[newMsg.length - 1]) {
            document.getElementById('msgList').scrollTop = document.getElementById('msgList').scrollHeight
            removeNew(newMsg[newMsg.length - 1])
        }

    }, [target, socket, removeNew, newMsg])

    return (
        <div className='App'>
            {props.status ?
                <div className='chat'>
                    <UsersWindow socket={props.socket} />
                    <ChatWindow socket={props.socket} />
                </div> :
                <LoginWindow socket={props.socket} />
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        status: state.logInStatus.loggedIn,
        users: state.users,
        messages: state.messages,
        target: state.msgTarget,
        newMsg: state.new,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: (id, nick) => dispatch(setUser(id, nick)),
        getUsers: (e) => dispatch(getUsers(e)),
        recieveMsg: (e) => dispatch(recieveMessages(e)),
        checkNew: (e) => dispatch(checkNew(e)),
        removeNew: (e) => dispatch(removeFromNew(e))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)