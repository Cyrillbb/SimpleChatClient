import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';


function CreateRoom(props) {
    const [selectedUsers, setUsers] = useState([])
    const [roomName, setRoomName] = useState('')

    const handleSelect = (e) => {
        if (e.target.checked) {
            setUsers([...selectedUsers, e.target.id])
        }
        else {
            setUsers(selectedUsers.filter(i => i !== e.target.id))
        }        
    }

    const handleCreateRoom = () => {
        props.socket.emit('create room', {
            roomName: roomName,
            users: selectedUsers
        })
    }

    return (
        <div className='createRoom'>
            <label htmlFor="roomName">Enter room name</label>
            <input type="text" id='roomName' onChange={(e) => setRoomName(e.target.value)} />
            <ul>
                {props.users.map(i =>
                    <div className='selectUserDiv'>
                        <input type='checkbox' id={i.nickname} onChange={handleSelect} />
                        <label htmlFor={i.nickname}>{i.nickname}</label>
                    </div>
                )}
            </ul>
            <Link to='/'>
                <button>Back</button>
            </Link>
            <Link to='/'>
                <button onClick={handleCreateRoom}>Create chat room</button>
            </Link>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}


export default connect(mapStateToProps, null)(CreateRoom)