import React from 'react';
import { connect } from 'react-redux';
import './chatWindow.css';
import { useEffect } from 'react';
import { removeFromNew } from './../../actions/removeFromNew';
import ChatRespMenu from './chatRespMenu/chatRespMenu';
import Message from './message/message';
import ChatForm from './chatForm/chatForm';
import RoomInfo from './roomInfo/roomInfo';

function ChatWindow(props) {
    const { socket, targetNickname, removeNew, newMsg, msgRef, usersRef, messages, myNickname } = props;

    useEffect(() => {
        if (targetNickname === newMsg[newMsg.length - 1]) {
            msgRef.current.scrollTop = msgRef.current.scrollHeight;
            removeNew(newMsg[newMsg.length - 1]);
            removeNew(myNickname)
        }
    }, [targetNickname, socket, removeNew, newMsg, msgRef]);

    return (
        <div className='chatWindow'>
            <ChatRespMenu usersRef={usersRef} />
            <RoomInfo />
            <div className='messageBox'>
                <ul className='messageList' ref={msgRef}>
                    {messages
                        .filter(i => i.to === targetNickname || i.from === targetNickname)
                        .map((i, index) => {
                            if (i.from === targetNickname && i.user !== myNickname) {
                                return <Message content={i} nameOfClass={'msgToMe'} key={index} />
                            }
                            else {
                                return <Message content={i} nameOfClass={'msgFromMe'} key={index} />
                            }
                        })
                    }
                </ul>
            </div>
            <ChatForm socket={socket} msgRef={msgRef} />
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