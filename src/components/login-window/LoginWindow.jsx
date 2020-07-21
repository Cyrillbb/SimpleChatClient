import React, { useState } from 'react';
import { login } from './../../actions/login';
import { connect } from 'react-redux';
import './LoginWindow.css'



function LoginWindow(props) {
    const { socket } = props;
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        socket.emit('logIn', { nickname, password });
    };

    const handleCreate = (e) => {
        socket.emit('newUser', { nickname, password });
        setNickname('');
        setPassword('');
    };

    return (
        <div>
            <form className="loginForm" onSubmit={handleLogin}>
                <h3>Simple chat login</h3>
                <input className='loginInpt'
                    type="text"
                    value={nickname}
                    onChange={(e) => { setNickname(e.target.value) }}
                    placeholder='enter ur nickname'
                    id="nick" required
                />
                <input className='loginInpt'
                    type="password"
                    placeholder='enter ur password'
                    id="pass" required
                    value={password}
                    onChange={e => { setPassword(e.target.value) }}
                />
                <div className='btnGroup'>
                    <button className='formBtn' type='submit'>Login</button>
                    <button className='formBtn'
                        type='button'
                        onClick={handleCreate}>
                        Create account
                    </button>
                </div>
            </form>
        </div>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        logIn: () => dispatch(login())
    }
};

export default connect(null, mapDispatchToProps)(LoginWindow);