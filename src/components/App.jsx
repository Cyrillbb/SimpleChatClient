import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import UsersWindow from './users-window/UsersWindow';
import ChatWindow from './chat-window/chatWindow';
import LoginWindow from './login-window/LoginWindow';
import { setUser } from './../actions/setUser';
import { getUsers } from './../actions/getUsers';
import { recieveMessages } from './../actions/recieveMessages';
import './App.css';
import { checkNew } from './../actions/checkNew';
import { removeFromNew } from './../actions/removeFromNew';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateRoom from './create-room-window/createRoom';
import RoomInvite from './room-invite/roomInvite';
import { getRooms } from './../actions/getRooms';
import Header from './header/header';
import { login } from './../actions/login';
import ErrorModal from './error-modal/ErrorModal';
import sound from '../assets/not.mp3';


function App(props) {

    const { socket, setUser, getUsers, recieveMsg, checkNew, getRooms, logIn, status } = props;
    const [inviteModal, setInviteModal] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [errorText, setErrorText] = useState('');
    const errorModal = useRef(null);
    const msgListRef = useRef(null);

    useEffect(() => {
        socket.on('logIn', () => {
            logIn();
        })
        socket.on('urUserData', e => {
            setUser(e);
        })
        socket.on('usersData', e => {
            getUsers(e);
        })
        socket.on('send messages', e => {
            recieveMsg(e);
            checkNew(e);
            const audio = new Audio(sound);
            audio.play();
        })
        socket.on('msgHistory', e => recieveMsg(e));
        socket.on('room invite', e => {
            console.log(e);
            setInviteModal(true);
            setRoomName(e);
        });
        socket.on('joined', e => {
            setInviteModal(false);
            getRooms(e);
        });
        socket.on('rooms', e => {
            getRooms(e);
        })
        socket.on('eb', e => {
            setErrorText(e);
            errorModal.current.className = "errorModal-visible";
        });
        socket.on('error', (error) => {
            setErrorText(error);
            errorModal.current.className = "errorModal-visible";
        });
    }, [socket, setUser, getUsers, recieveMsg, checkNew, getRooms, logIn]);



    const refUsersWindow = useRef(null);

    return (
        <div className='App'>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/'>
                        {status ?
                            <div>
                                <Header />
                                <div className='chat'>
                                    <UsersWindow msgRef={msgListRef} usersRef={refUsersWindow} socket={socket} />
                                    <ChatWindow msgRef={msgListRef} usersRef={refUsersWindow} socket={socket} />
                                    <ErrorModal errorRef={errorModal} errorText={errorText} />
                                </div>
                            </div>
                            :
                            <div>
                                <Header />
                                <LoginWindow socket={socket} />
                                <ErrorModal errorRef={errorModal} errorText={errorText} />
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
                        {
                            inviteModal ? <RoomInvite
                                roomName={roomName}
                                socket={socket}
                                setModal={setInviteModal} /> : undefined
                        }
                        <CreateRoom socket={socket} />
                        <ErrorModal errorRef={errorModal} errorText={errorText} />
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
};

const mapDispatchToProps = dispatch => {
    return {
        setUser: (id, nick) => dispatch(setUser(id, nick)),
        getUsers: (e) => dispatch(getUsers(e)),
        recieveMsg: (e) => dispatch(recieveMessages(e)),
        checkNew: (e) => dispatch(checkNew(e)),
        removeNew: (e) => dispatch(removeFromNew(e)),
        getRooms: (e) => dispatch(getRooms(e)),
        logIn: () => dispatch(login())

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);