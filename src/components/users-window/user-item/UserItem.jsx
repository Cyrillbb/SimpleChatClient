import React from 'react';
import { connect } from 'react-redux';
import { setMsgtarget } from './../../../actions/setMsgTarget';
import { removeFromNew } from '../../../actions/removeFromNew';

function UserItem(props) {
    const { item, highlight, newMsg, setTarget, checkNew, msgRef, usersRef } = props;
    return (
        <li
            className='user'
            key={item.nickname}
            onClick={(e) => {
                setTarget(item.nickname);
                checkNew(item.nickname);
                setTimeout(() => {
                    msgRef.current.scrollTop = msgRef.current.scrollHeight
                }, 50);
                highlight(e)
                usersRef.current.className = 'usersWindow'
            }}
        >
            {item.nickname} {newMsg.indexOf(item.nickname) > -1 ?
                <span className='counter'>{newMsg.filter(j => j === item.nickname).length}</span>
                : undefined}
        </li>
    )
};

const mapStateToProps = state => {
    return {
        newMsg: state.new,        
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setTarget: (nick) => dispatch(setMsgtarget(nick)),
        checkNew: (nick) => dispatch(removeFromNew(nick))
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(UserItem);