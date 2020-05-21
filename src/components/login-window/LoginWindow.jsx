import React, { useState } from 'react'
import { login } from './../../actions/login';
import { connect } from 'react-redux';
import './LoginWindow.css'

function LoginWindow(props) {
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [loginType, setLoginType] = useState('login')

    const handleLogin = (e) => {
        e.preventDefault()
        props.socket.emit('logIn', { nickname, password })
        props.logIn()
    }

    const handleCreate = (e) => {
        e.preventDefault()
        props.socket.emit('newUser', { nickname, password })
    }

    return (
        <div>
            {loginType === 'login' ?
                <form className="loginForm" onSubmit={handleLogin}>
                    <h3>Simple chat login</h3>
                    <input className='loginInpt'
                        type="text"
                        onChange={(e) => { setNickname(e.target.value) }}
                        placeholder='enter ur nickname'
                        id="nick" required
                    />
                    <input className='loginInpt'
                        type="password"
                        placeholder='enter ur password'
                        id="pass" required
                    />
                    <div className='btnGroup'>
                        <button className='formBtn' type='submit'>Login</button>
                        <button className='formBtn'
                            type='button'
                            onClick={() => { setLoginType('reg'); }}>
                            Create account
                        </button>
                    </div>
                </form> :
                <form onSubmit={handleCreate} className="loginForm">
                    <h3>Simple chat registration</h3>
                    <input className='loginInpt'
                        type="text"
                        id='nick'
                        placeholder='enter ur nickname'
                        onChange={e => { setNickname(e.target.value) }} required
                    />
                    <input
                        className='loginInpt'
                        type="password" id='pass'
                        placeholder='enter ur password'
                        onChange={e => { setPassword(e.target.value) }} required
                    />
                    <div className='btnGroup'>
                        <button className='formBtn' type='submit'>Create account</button>
                        <button className='formBtn' onClick={() => setLoginType('login')}>Back</button>
                    </div>
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