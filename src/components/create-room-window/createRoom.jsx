import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './createRoom.css'

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
            <input type="text" id='roomName' placeholder='Enter room name' className='loginInpt' autoComplete='off' onChange={(e) => setRoomName(e.target.value)} />
            <ul className='roomUserList'>
                {props.users.map(i =>
                    <li key={i.nickname} className='selectUserDiv'>
                        <input type='checkbox' id={i.nickname} onChange={handleSelect} />
                        <label htmlFor={i.nickname}>{i.nickname}</label>
                    </li>
                )}
            </ul>
            <div className='btnGroup'>
                <Link to='/'>
                    <button className='formBtn'>Back</button>
                </Link>
                <Link to='/'>
                    <button className='formBtn' onClick={handleCreateRoom}>Create chat room</button>
                </Link>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}


export default connect(mapStateToProps, null)(CreateRoom)