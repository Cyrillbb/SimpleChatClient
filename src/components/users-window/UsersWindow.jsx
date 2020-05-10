import React from 'react'
import { connect } from 'react-redux'
import { setMsgtarget } from './../../actions/setMsgTarget';
import './UsersWindow.css'

function UsersWindow(props) {
    return (
        <div className='usersWindow'>
            <ul className='usersList'>
                {props.usersList.filter(i => i.nickname !== props.userInfo.nickname).map(i =>
                    <li
                        className='user'
                        key={i.id}
                        onClick={() => { props.setTarget(i.nickname); props.socket.emit('getChat', props.target) }}
                    >
                        {i.nickname}
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTarget: (nick) => dispatch(setMsgtarget(nick))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersWindow)