import React, { useEffect, useState } from 'react'
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
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateRoom from './create-room-window/createRoom';
import RoomInvite from './room-invite/roomInvite';


function App(props) {

    const { socket, setUser, getUsers, recieveMsg, checkNew, target, removeNew, newMsg } = props

    const [inviteModal, setInviteModal] = useState(false)
    const [roomName, setRoomName] = useState('')

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
        socket.on('room invite', e => {
            console.log(e)
            setInviteModal(true)
            setRoomName(e)
        })
        socket.on('joined', e => alert(e))
    }, [socket, setUser, getUsers, recieveMsg, checkNew])

    useEffect(() => {
        if (target === newMsg[newMsg.length - 1]) {
            document.getElementById('msgList').scrollTop = document.getElementById('msgList').scrollHeight
            removeNew(newMsg[newMsg.length - 1])
        }

    }, [target, socket, removeNew, newMsg])

    return (
        <div className='App'>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/'>
                        {props.status ?
                            <div className='chat'>
                                <UsersWindow socket={props.socket} />
                                <ChatWindow socket={props.socket} />
                            </div> :
                            <LoginWindow socket={props.socket} />                            
                        }
                        {
                            inviteModal ? <RoomInvite 
                            roomName={roomName} 
                            socket={socket}
                            setModal={setInviteModal} /> : <div></div>
                        }
                    </Route>
                    <Route exact path='/createRoom'>
                        <CreateRoom socket={socket} />
                    </Route>
                </Switch>
            </BrowserRouter>
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