import React, { useState } from 'react'
import { connect } from 'react-redux'
import './chatWindow.css'

function ChatWindow(props) {
    const [msg, setMsg] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.socket.emit('message', {
            message: msg,
            from: props.myNickname,
            to: props.targetNickname
        })
    }

    return (
        <div className='chatWindow'>
            <div className='messageBox'>
                <ul className='messageList'>
                    {props.messages
                        .filter(i => i.to === props.targetNickname || i.from === props.targetNickname)
                        .map(i => <li key={i.message}>{i.message}</li>)

                    }
                </ul>
            </div>
            <form className='chatForm' onSubmit={handleSubmit}>
                <input onChange={(e) => { setMsg(e.target.value) }} type="text" id="msg" />
                <button type='submit'>Send</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        myNickname: state.userInfo.nickname,
        targetNickname: state.msgTarget,
        messages: state.messages
    }
}

export default connect(mapStateToProps, null)(ChatWindow)