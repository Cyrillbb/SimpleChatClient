import React, { useEffect, useState, useRef } from 'react'
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
import { getRooms } from './../actions/getRooms';
import Header from './header/header';


function App(props) {

    const { socket, setUser, getUsers, recieveMsg, checkNew, target, removeNew, newMsg, getRooms } = props

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
        socket.on('joined', e => {
            setInviteModal(false)
            getRooms(e)
        })
        socket.on('rooms', e => {
            getRooms(e)
        })
    }, [socket, setUser, getUsers, recieveMsg, checkNew, getRooms])

    useEffect(() => {
        if (target === newMsg[newMsg.length - 1]) {
            document.getElementById('msgList').scrollTop = document.getElementById('msgList').scrollHeight
            removeNew(newMsg[newMsg.length - 1])
        }

    }, [target, socket, removeNew, newMsg])

    const refUsersWindow = useRef(null)

    return (
        <div className='App'>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/'>
                        {props.status ?
                            <div className='chat'>
                                <UsersWindow usersRef={refUsersWindow} socket={props.socket} />
                                <ChatWindow usersRef={refUsersWindow} socket={props.socket} />
                            </div>
                            :
                            <div>
                                <Header />
                                <LoginWindow socket={props.socket} />
                            </div>
                        }
                        {
                            inviteModal ? <RoomInvite
                                roomName={roomName}
                                socket={socket}
                                setModal={setInviteModal} /> : undefined
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
        removeNew: (e) => dispatch(removeFromNew(e)),
        getRooms: (e) => dispatch(getRooms(e))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)