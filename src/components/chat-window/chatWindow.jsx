import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import './chatWindow.css'
import { useEffect } from 'react'
import { removeFromNew } from './../../actions/removeFromNew';



function ChatWindow(props) {
    const [msg, setMsg] = useState('');
    const { socket, targetNickname, removeNew, newMsg, msgRef } = props;
    const msgForm = useRef(null);
    
    useEffect(() => {
        if (targetNickname === newMsg[newMsg.length - 1]) {
            msgRef.current.scrollTop = msgRef.current.scrollHeight;
            removeNew(newMsg[newMsg.length - 1]);
        }

    }, [targetNickname, socket, removeNew, newMsg, msgRef]);

    const imgRegEx = /png$|jpg$|jpeg$|gif$/;

    const handleSubmit = (e) => {
        e.preventDefault()
        if (props.targetNickname.length !== 0 && msg.split(' ').join('').length !== 0) {
            props.socket.emit('message', {
                message: msg,
                from: props.myNickname,
                to: props.targetNickname
            })
            setMsg('')
            msgForm.current.value = ''
            setTimeout(() => {
                msgRef.current.scrollTop = msgRef.current.scrollHeight
            }, 500)
        }
    };



    const handleRespMenu = () => {
        props.usersRef.current.className === 'usersWindow' ?
            props.usersRef.current.className = 'usersWindow-resp' :
            props.usersRef.current.className = 'usersWindow'
    };

    return (
        <div className='chatWindow'>
            <div className='chatResMenu'>
                <i onClick={handleRespMenu} className="fas fa-bars"></i>
                {props.newMsg.filter(i => i !== props.myNickname).length > 0 ?
                    <span className='counterResp'>{props.newMsg.filter(i => i !== props.myNickname).length}</span>
                    :
                    undefined
                }
                <span className='respHeader'>Simple chat</span>
            </div>
            {props.rooms.find(i => i.roomName === props.targetNickname) ?
                <div className='roomInfo'>
                    <span>
                        {props.targetNickname}:
                        <span style={{ marginTop: '0px' }}>{props.rooms.find(i => i.roomName === props.targetNickname).users.map(item =>
                            <span style={{ marginTop: '0px' }} key={item}>{item}</span>
                        )}
                        </span>
                    </span>
                </div> : <div className='roomInfo'>
                    <span style={{ marginLeft: '0.4em' }}>Current chat: {props.targetNickname}</span>
                </div>}
            <div className='messageBox'>
                <ul className='messageList' ref={props.msgRef}>
                    {props.messages
                        .filter(i => i.to === props.targetNickname || i.from === props.targetNickname)
                        .map((i, index) => {
                            if (i.from === props.targetNickname && i.user !== props.myNickname) {
                                return <li className='msgToMe' key={index}>
                                    <div style={{ margin: '0px' }}>
                                        {imgRegEx.test(i.message) ?
                                            <a target="_blank" className='imgLink' rel="noopener noreferrer" href={i.message}>
                                                <img src={i.message} style={{ maxWidth: '100%', maxHeight: '100%' }} alt={i.message} />
                                            </a> :
                                            i.message
                                        }
                                    </div>
                                    <div>
                                        <small className='smallName'>{i.user || i.from}</small>
                                    </div>
                                </li>
                            }
                            else {
                                return <li className='msgFromMe' key={index}>
                                    <div>
                                        {imgRegEx.test(i.message) ?
                                            <a target="_blank" className='imgLink' style={{ textDecoration: 'none' }} rel="noopener noreferrer" href={i.message}>
                                                <img src={i.message} style={{ maxWidth: '100%', maxHeight: '100%' }} alt={i.message} />
                                            </a> :
                                            i.message
                                        }
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <small className='smallName'>{i.user || i.from}</small>
                                    </div>
                                </li>
                            }
                        })

                    }
                </ul>
            </div>
            <form className='chatForm' onSubmit={handleSubmit}>
                <input className='msgInput' onChange={(e) => { setMsg(e.target.value) }} placeholder='message...' autoComplete='off' type="text" ref={msgForm} id="msg" />
                <button className='sendBtn' type='submit'><i className="far fa-paper-plane"></i></button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        myNickname: state.userInfo.nickname,
        targetNickname: state.msgTarget,
        messages: state.messages,
        newMsg: state.new,
        rooms: state.rooms,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeNew: (e) => dispatch(removeFromNew(e)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow)