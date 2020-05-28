import React, { useState } from 'react';
import { connect } from 'react-redux';
import './addUsers.css'

const AddUsers = props => {
    const [newUsers, setNewUsers] = useState([])

    const handleSelect = (e) => {
        if (e.target.checked) {
            setNewUsers([...newUsers, e.target.id])
        }
        else {
            setNewUsers(newUsers.filter(i => i !== e.target.id))
        }
    }

    const handleAddUsers = () => {
        props.socket.emit('add users', {
            roomName: props.target,
            users: newUsers
        })
        props.addRef.current.className = 'addUsers'
    }

    return (
        <div className='addUsers' ref={props.addRef}>
            <ul className='roomUserList'>
                {props.users.map(i =>
                    <li key={i.nickname} className='selectUserDiv'>
                        <input type='checkbox' id={i.nickname} onChange={handleSelect} />
                        <label htmlFor={i.nickname}>{i.nickname}</label>
                    </li>
                )}
            </ul>
            <div className='btnGroup'>
                <button className='formBtn' onClick={() => {props.addRef.current.className = 'addUsers'}}>Back</button>
                <button className='formBtn' onClick={handleAddUsers}>Add users</button>
            </div>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        users: state.users,
        target: state.msgTarget,
    }
}

export default connect(mapStateToProps, null)(AddUsers)