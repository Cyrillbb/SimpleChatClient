import React, { useState } from 'react';
import { connect } from 'react-redux';
import './UsersWindow.css';
import AddUsers from './add-users-window/addUsers';
import { useRef } from 'react';
import TopBtnBlock from './top-btn-block/TopBtnBlock';
import UserItem from './user-item/UserItem';
import RoomItem from './room-item/RoomItem';
import BottomBtnBlock from './borrom-btn-block/BottomBtnBlock';

function UsersWindow(props) {
    const { msgRef, usersRef, socket, userInfo, usersList, rooms } = props;

    const addUsersRef = useRef(null);
    const [current, setCurrent] = useState('');
    const [view, setView] = useState('users');

    const handleHighlight = (e) => {
        console.log(e.target)
        if (current) {
            current.classList.remove('controlsHighlighted');
        }
        setCurrent(e.target);
        e.target.classList.add('controlsHighlighted');
    };

    return (
        <div ref={usersRef} className='usersWindow'>
            <AddUsers addRef={addUsersRef} current={current} socket={socket} />
            <h3 className='userHeader'>Logged in as {userInfo.nickname}</h3>
            <TopBtnBlock setView={setView} />
            <ul className='usersList'>
                {view === 'users' ?
                    usersList.filter(i => i.nickname !== userInfo.nickname).map(i =>
                        <UserItem key={i.nickname} msgRef={msgRef} usersRef={usersRef} item={i} highlight={handleHighlight} />
                    ) :
                    rooms.map(i =>
                        <RoomItem key={i.roomName} item={i} handleHighlight={handleHighlight} addUsersRef={addUsersRef}
                            msgRef={msgRef} usersRef={usersRef} socket={socket}
                        />
                    )}
            </ul>
            <BottomBtnBlock />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        usersList: state.users,
        userInfo: state.userInfo,
        rooms: state.rooms,
    }
};

export default connect(mapStateToProps, null)(UsersWindow);