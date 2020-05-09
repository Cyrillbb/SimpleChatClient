import React, { useState } from 'react'
import { connect } from 'react-redux'

function ChatWindow(props) {
    const [msg, setMsg] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.socket.emit('message', {
            message: msg,
            from: props.myId,
            to: props.targetId
        })
    }

    return (
        <div className='ChatWindow'>
            <div className='messageBox'>
                <ul>
                    {props.messages
                        .filter(i => i.to === props.targetId || i.from === props.targetId)
                        .map(i => <li key={i.message}>{i.message}</li>)

                    }
                </ul>
            </div>
            <form onSubmit={handleSubmit}>
                <input onChange={(e) => { setMsg(e.target.value) }} type="text" id="msg" />
                <button type='submit'>Send</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        myId: state.userInfo.id,
        targetId: state.msgTarget,
        messages: state.messages
    }
}

export default connect(mapStateToProps, null)(ChatWindow)