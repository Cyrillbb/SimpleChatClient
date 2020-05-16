import React from 'react';
import './roomName.css'

function RoomInvite(props) {

    const handleJoinRoom = () => {
        props.socket.emit('join room', props.roomName)
    }

    const handleDecline = () => {
        props.setModal(false)
    }

    return (
        <div className='roomInvite'>
            <div>
                You were invited to join {props.roomName}
            </div>
            <button onClick={handleJoinRoom}>
                Join room
        </button>
            <button onClick={handleDecline}>
                Decline
        </button>
        </div>
    )
}

export default RoomInvite;