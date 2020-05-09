import React from 'react'
import { connect } from 'react-redux'
import { setMsgtarget } from './../../actions/setMsgTarget';

function UsersWindow(props) {
    return (
        <div className='UsersWindow'>
            {props.usersList.filter(i => i.id !== props.userInfo).map(i =>
                <li
                    key={i.id}
                    onClick={() => { props.setTarget(i.id); props.socket.emit('getChat', props.target) }}
                >
                    {i.nickname}
                </li>
            )}
        </div>
    )
}


const mapStateToProps = state => {
    return {
        usersList: state.users,
        userInfo: state.userInfo.id,
        target: state.msgTarget,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTarget: (id) => dispatch(setMsgtarget(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersWindow)