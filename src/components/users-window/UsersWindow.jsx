import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setMsgtarget } from './../../actions/setMsgTarget';
import './UsersWindow.css'
import { removeFromNew } from './../../actions/removeFromNew';
import { Link } from 'react-router-dom';
import AddUsers from './add-users-window/addUsers';
import { useRef } from 'react';

function UsersWindow(props) {
    const addUsersRef = useRef(null)
    const [current, setCurrent] = useState('')
    const [view, setView] = useState('users')

    const handleHighlight = (e) => {
        if (current) {
            current.classList.remove('controlsHighlighted')
        }
        setCurrent(e.target)
        e.target.classList.add('controlsHighlighted')
    }
    const handleRespMenu = () => {
        props.usersRef.current.className === 'usersWindow' ?
            props.usersRef.current.className = 'usersWindow-resp' :
            props.usersRef.current.className = 'usersWindow'
    }

    return (
        <div ref={props.usersRef} className='usersWindow'>
            <AddUsers addRef={addUsersRef} current={current} socket={props.socket} />
            <h3 className='userHeader'>Logged in as {props.userInfo.nickname} {props.new.filter(i => i !== props.myNickname).length > 0 ?
                <span className='counter'>{props.new.filter(i => i !== props.myNickname).length}</span> :
                undefined
            }</h3>
            <div className='btnBlock'>
                <button className='controls' onClick={() => setView('users')}>Show users online</button>
                <button className='controls' onClick={() => setView('rooms')}>Show rooms</button>
            </div>
            <ul className='usersList'>
                {view === 'users' ?
                    props.usersList.filter(i => i.nickname !== props.userInfo.nickname).map(i =>
                        <li
                            className='user'
                            key={i.nickname}
                            onClick={(e) => {
                                props.setTarget(i.nickname);
                                props.checkNew(i.nickname);
                                setTimeout(() => {
                                    document.getElementById('msgList').scrollTop = document.getElementById('msgList').scrollHeight
                                }, 50);
                                handleHighlight(e)
                                handleRespMenu()
                            }}
                        >
                            {i.nickname} {props.new.indexOf(i.nickname) > -1 ?
                                <span className='counter'>{props.new.filter(j => j === i.nickname).length}</span>
                                : undefined}
                        </li>
                    ) :
                    props.rooms.map(i =>
                        <li key={i}
                            className='user'
                            onClick={(e) => {
                                props.setTarget(i);
                                props.checkNew(i);
                                setTimeout(() => {
                                    document.getElementById('msgList').scrollTop = document.getElementById('msgList').scrollHeight
                                }, 50);
                                handleHighlight(e)
                                handleRespMenu()
                            }}
                        >
                            {i}
                            {i.nickname} {props.new.indexOf(i) > -1 ?
                                <span className='counter'>{props.new.filter(j => j === i).length}</span>
                                : undefined}
                            <i className="fas fa-times-circle" onClick={() => {
                                props.socket.emit('decline room', { room: i, user: props.userInfo.nickname })
                            }}></i>
                            <i className="far fa-plus-square" onClick={() => addUsersRef.current.className = 'addUsers-v'}></i>
                        </li>
                    )}
            </ul>
            <div className='btnBlock'>
                <Link to='/createRoom'>
                    <button className='controls'>Create room</button>
                </Link>
                <button onClick={() => { window.location.reload() }} className='controls'>Logout</button>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        usersList: state.users,
        userInfo: state.userInfo,
        target: state.msgTarget,
        new: state.new,
        rooms: state.rooms,
        myNickname: state.userInfo.nickname,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTarget: (nick) => dispatch(setMsgtarget(nick)),
        checkNew: (nick) => dispatch(removeFromNew(nick))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersWindow)