import React, { useState } from 'react'
import { login } from './../../actions/login';
import { connect } from 'react-redux';

function LoginWindow(props) {
    const [nick, setNick] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.socket.emit('logIn', nick)
        props.logIn()
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => { setNick(e.target.value) }} placeholder='enter ur nickname' id="nick" required />
            <input type="password" placeholder='enter ur password' id="pass" required />
            <button type='submit'>Submit</button>
        </form>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        logIn: () => dispatch(login())
    }
}

export default connect(null, mapDispatchToProps)(LoginWindow)