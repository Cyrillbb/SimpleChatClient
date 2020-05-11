import React from 'react'
import { connect } from 'react-redux'
import { setMsgtarget } from './../../actions/setMsgTarget';
import './UsersWindow.css'
import { removeFromNew } from './../../actions/removeFromNew';

function UsersWindow(props) {
    return (
        <div className='usersWindow'>
            <ul className='usersList'>
                {props.usersList.filter(i => i.nickname !== props.userInfo.nickname).map(i =>
                    <li
                        className='user'
                        key={i.nickname}
                        onClick={() => {
                            props.setTarget(i.nickname);
                            props.socket.emit('getChat', props.target);
                            props.checkNew(i.nickname)
                        }}
                    >
                        {i.nickname} {props.new.filter(j => j === i.nickname).length}
                    </li>
                )}
            </ul>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        usersList: state.users,
        userInfo: state.userInfo,
        target: state.msgTarget,
        new: state.new,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTarget: (nick) => dispatch(setMsgtarget(nick)),
        checkNew: (nick) => dispatch(removeFromNew(nick))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersWindow)