import React from 'react';
import { connect } from 'react-redux';

function TopBtnBlock(props) {
    const { setView, newMsg, myNickname, usersList, rooms } = props;

    return (
        <div className='btnBlock'>
            <button className='controls' onClick={() => setView('users')}>
                Show users online
                    {newMsg.filter(i => i !== myNickname && usersList.find(item => item.nickname === i)).length > 0 ?
                    <span className='counter'>{newMsg.filter(i => i !== myNickname).length}</span> :
                    undefined
                }
            </button>
            <button className='controls' onClick={() => setView('rooms')}>
                Show rooms
                    {newMsg.filter(i => i !== myNickname && rooms.find(item => item.roomName === i)).length > 0 ?
                    <span className='counter'>{newMsg.filter(i => i !== myNickname).length}</span> :
                    undefined
                }
            </button>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        usersList: state.users,
        newMsg: state.new,
        myNickname: state.userInfo.nickname,
        rooms: state.rooms,
    }
};


export default connect(mapStateToProps, null)(TopBtnBlock);