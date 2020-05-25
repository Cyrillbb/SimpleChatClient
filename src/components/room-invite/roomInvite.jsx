import React from 'react';
import './roomName.css'
import { connect } from 'react-redux';

function RoomInvite(props) {

    const handleJoinRoom = () => {
        props.socket.emit('join room', { room: props.roomName, id: props.userInfo.id})
    }

    // const handleDecline = () => {
    //     props.setModal(false)
    //     props.socket.emit('decline room', {room: props.roomName, user: props.userInfo.nickname})
    // }

    return (
        <div className='roomInvite'>
            <div className='invBody'>
                <h3 className='invHeader'>
                    You were invited to join {props.roomName}
                </h3>
                <div className='btnGroup'>
                    <button className='formBtn' onClick={handleJoinRoom}>
                        Join room
                    </button>
                    {/* <button className='formBtn' onClick={handleDecline}>
                        Decline
                    </button> */}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps, null)(RoomInvite);