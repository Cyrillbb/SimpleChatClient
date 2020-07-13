import React from 'react';
import { Link } from 'react-router-dom';
import './BottomBtnBlock.css'

function BottomBtnBlock() {
    return (
        <div className='btnBlock'>
            <Link to='/createRoom'>
                <button className='controls'>Create room</button>
            </Link>
            <button onClick={() => { window.location.reload() }} className='controls'>Logout</button>
        </div>        
    )
}

export default BottomBtnBlock;