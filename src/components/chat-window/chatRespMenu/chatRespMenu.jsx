import React from 'react';
import { connect } from 'react-redux';
import './chatRespMenu.css';

function ChatRespMenu(props) {
    const { myNickname, newMsg, usersRef } = props;

    const handleRespMenu = () => {
        usersRef.current.className === 'usersWindow' ?
            usersRef.current.className = 'usersWindow-resp' :
            usersRef.current.className = 'usersWindow'
    };

    return (
        <div className='chatResMenu'>
            <i onClick={handleRespMenu} className="fas fa-bars"></i>
            {newMsg.filter(i => i !== myNickname).length > 0 ?
                <span className='counterResp'>{newMsg.filter(i => i !== myNickname).length}</span>
                :
                undefined
            }
            <span className='respHeader'>Simple chat</span>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        myNickname: state.userInfo.nickname,
        newMsg: state.new,
    }
}

export default connect(mapStateToProps, null)(ChatRespMenu)