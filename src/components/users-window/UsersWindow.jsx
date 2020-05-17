import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setMsgtarget } from './../../actions/setMsgTarget';
import './UsersWindow.css'
import { removeFromNew } from './../../actions/removeFromNew';
import { Link } from 'react-router-dom';

function UsersWindow(props) {

    const [current, setCurrent] = useState('')

    const handleHighlight = (e) => {
        if (current) {
            current.classList.remove('controlsHighlighted')
        }
        setCurrent(e.target)
        e.target.classList.add('controlsHighlighted')
    }

    return (
        <div className='usersWindow'>
            <h3 className='userHeader'>Logged in as {props.userInfo.nickname}</h3>
            <ul className='usersList'>
                {props.usersList.filter(i => i.nickname !== props.userInfo.nickname).map(i =>
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
                        }}
                    >
                        {i.nickname} {props.new.indexOf(i.nickname) > -1 ?
                            <span className='counter'>{props.new.filter(j => j === i.nickname).length}</span>
                            : <div></div>}
                    </li>
                )}
                {props.rooms.map(i =>
                    <li id={i}
                        className='user'
                        onClick={(e) => {
                            props.setTarget(i);
                            props.checkNew(i);
                            setTimeout(() => {
                                document.getElementById('msgList').scrollTop = document.getElementById('msgList').scrollHeight
                            }, 50);
                            handleHighlight(e)
                        }}
                    >
                        {i}
                        {i.nickname} {props.new.indexOf(i) > -1 ?
                            <span className='counter'>{props.new.filter(j => j === i).length}</span>
                            : <div></div>}
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTarget: (nick) => dispatch(setMsgtarget(nick)),
        checkNew: (nick) => dispatch(removeFromNew(nick))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersWindow)