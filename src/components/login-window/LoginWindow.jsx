import React, { useState } from 'react'
import { login } from './../../actions/login';
import { connect } from 'react-redux';

function LoginWindow(props) { 
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')   
    const [loginType, setLoginType] = useState('login')

    const handleLogin = (e) => {
        e.preventDefault()
        props.socket.emit('logIn', {nickname, password})
        props.logIn()
    }

    const handleCreate = (e) => {
        e.preventDefault()
        props.socket.emit('newUser', {nickname, password})
    }

    return (
        <div>
            {loginType === 'login' ?
                <form onSubmit={handleLogin}>
                    <input type="text" onChange={(e) => { setNickname(e.target.value) }} placeholder='enter ur nickname' id="nick" required />
                    <input type="password" placeholder='enter ur password' id="pass" required />
                    <button type='submit'>Submit</button>
                    <button type='button' onClick={() => {setLoginType('reg'); console.log(loginType)}}>Create account</button>
                </form> :

                <form onSubmit={handleCreate}>
                    <label htmlFor="nick">Your nickname</label>
                    <input type="text" id='nick' onChange={e => { setNickname(e.target.value) }} required />
                    <label htmlFor="pass">Your password</label>
                    <input type="password" id='pass' onChange={e => { setPassword(e.target.value) }} required />
                    <button type='submit'>Submit</button>
                    <button onClick={() => setLoginType('login')}>Back</button>
                </form>
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        logIn: () => dispatch(login())
    }
}

export default connect(null, mapDispatchToProps)(LoginWindow)