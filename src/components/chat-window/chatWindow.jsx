import React, { useState } from 'react'
import { connect } from 'react-redux'
import './chatWindow.css'

function ChatWindow(props) {
    const [msg, setMsg] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (props.targetNickname.length !== 0) {
            props.socket.emit('message', {
                message: msg,
                from: props.myNickname,
                to: props.targetNickname
            })
            setMsg('')
            document.getElementById('msg').value = ''
            setTimeout(() => {
                document.getElementById('msgList').scrollTop = document.getElementById('msgList').scrollHeight
            }, 500)
        }
    }

    return (
        <div className='chatWindow'>
            <div className='messageBox'>
                <ul className='messageList' id='msgList'>
                    {props.messages
                        .filter(i => i.to === props.targetNickname || i.from === props.targetNickname)
                        .map((i, index) => {
                            if (i.from === props.targetNickname && i.user !== props.myNickname) {
                                return <li className='msgToMe' key={index}>
                                    {i.message} <br /> <small className='smallName'>{i.user || i.from}</small>
                                </li>
                            }
                            else {
                                return <li className='msgFromMe' key={index}>
                                    {i.message} <br /> <small className='smallName'>{i.user || i.from}</small>
                                </li>
                            }
                        })

                    }
                </ul>
            </div>
            <form className='chatForm' onSubmit={handleSubmit}>
                <input onChange={(e) => { setMsg(e.target.value) }} type="text" id="msg" />
                <button className='sendBtn' type='submit'><i className="far fa-paper-plane"></i></button>
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