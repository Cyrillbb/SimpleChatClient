import React from 'react';
import { connect } from 'react-redux';

function RoomInfo(props) {
    const { rooms, targetNickname } = props;

    return (
        <div>
            {rooms.find(i => i.roomName === targetNickname) ?
                <div className='roomInfo'>
                    <span>
                        {targetNickname}:
                    <span style={{ marginTop: '0px' }}>{rooms.find(i => i.roomName === targetNickname).users.map(item =>
                            <span style={{ marginTop: '0px' }} key={item}>{item}</span>
                        )}
                        </span>
                    </span>
                </div> : <div className='roomInfo'>
                    <span style={{ marginLeft: '0.4em' }}>Current chat: {targetNickname}</span>
                </div>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        targetNickname: state.msgTarget,
        rooms: state.rooms,
    }
}

export default connect(mapStateToProps, null)(RoomInfo)