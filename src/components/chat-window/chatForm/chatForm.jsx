import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import './chatForm.css';

function ChatForm(props) {
    const { msgRef, targetNickname, socket, myNickname } = props
    const [msg, setMsg] = useState('');
    const msgForm = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault()
        if (targetNickname.length !== 0 && msg.split(' ').join('').length !== 0) {
            socket.emit('message', {
                message: msg,
                from: myNickname,
                to: targetNickname
            })
            setMsg('')
            msgForm.current.value = ''
            setTimeout(() => {
                msgRef.current.scrollTop = msgRef.current.scrollHeight
            }, 500)
        }
    };

    return (
        <form className='chatForm' onSubmit={handleSubmit}>
            {targetNickname.length > 0 ? 
            <input className='msgInput' 
            onChange={(e) => { setMsg(e.target.value) }} 
            placeholder='message...' autoComplete='off' type="text" ref={msgForm} id="msg" />:
            <input className='msgInput' disabled='true' id="msg" type="text"/>
            }
            
            <button className='sendBtn' type='submit'><i className="far fa-paper-plane"></i></button>
        </form>
    )
}

const mapStateToProps = state => {
    return {
        myNickname: state.userInfo.nickname,
        targetNickname: state.msgTarget,       
    }
}



export default connect(mapStateToProps, null)(ChatForm)