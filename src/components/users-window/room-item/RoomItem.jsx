import React from 'react';
import { connect } from 'react-redux';
import { setMsgtarget } from './../../../actions/setMsgTarget';
import { removeFromNew } from '../../../actions/removeFromNew';
import './RoomItem.css'

function RoomItem(props) {    
    const { item, handleHighlight, addUsersRef, setTarget, checkNew, newMsg, msgRef, usersRef, socket, userInfo } = props;

    return (
        <li key={item.roomName}
            className='user'
            onClick={(e) => {
                setTarget(item.roomName);
                checkNew(item.roomName);
                setTimeout(() => {
                    msgRef.current.scrollTop = msgRef.current.scrollHeight
                }, 50);
                handleHighlight(e)
                usersRef.current.className = 'usersWindow'
            }}
        >
            {item.roomName}
            {item.nickname} {newMsg.indexOf(item.roomName) > -1 ?
                <span className='counter'>{newMsg.filter(j => j === item.roomName).length}</span>
                : undefined}
            <i className="fas fa-times-circle" onClick={(e) => {
                e.stopPropagation()
                socket.emit('decline room', { room: item.roomName, nickname: userInfo.nickname })
                setTarget('')
            }}></i>
            <i className="far fa-plus-square" onClick={() => addUsersRef.current.className = 'addUsers-v'}></i>
        </li>
    )
}

const mapStateToProps = state => {
    return {       
        newMsg: state.new,
        userInfo: state.userInfo,               
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setTarget: (nick) => dispatch(setMsgtarget(nick)),
        checkNew: (nick) => dispatch(removeFromNew(nick))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomItem);