import React from 'react';
import './roomName.css';
import { connect } from 'react-redux';

function RoomInvite(props) {
    const { socket, roomName, userInfo, setModal } = props;

    const handleJoinRoom = () => {
        console.log('JOIN');
        socket.emit('join room', { room: roomName, nickname: userInfo.nickname });
    };

    const handleDecline = () => {
        setModal(false);
        socket.emit('decline room', { room: roomName, nickname: userInfo.nickname });
    };

    return (
        <div className='roomInvite'>
            <div className='invBody'>
                <h3 className='invHeader'>
                    You were invited to join {roomName}
                </h3>
                <div className='btnGroup'>
                    <button className='formBtn' onClick={handleJoinRoom}>
                        Join room
                    </button>
                    <button className='formBtn' onClick={handleDecline}>
                        Decline
                    </button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    }
};

export default connect(mapStateToProps, null)(RoomInvite);