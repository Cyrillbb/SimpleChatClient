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

    useEffect(() => {
        props.socket.on('urUserData', e => {
            props.setUser(e)
        })
        props.socket.on('usersData', e => {
            props.getUsers(e)
        })
        props.socket.on('send messages', e => {
            props.recieveMsg(e)
            props.checkNew(e)
        })
        props.socket.on('msgHistory', e => props.recieveMsg(e))
    }, [])

    useEffect(() => {
        const checkCurrent = (e) => {
            if (e.from === props.target) {
                document.getElementById('msgList').scrollTop = document.getElementById('msgList').scrollHeight
                props.removeNew(e.from)
                
            }            
        }
        props.socket.removeListener('send messages', checkCurrent)        
        props.socket.on('send messages', checkCurrent)        
    }, [props.target, props.socket])

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
        target: state.msgTarget
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