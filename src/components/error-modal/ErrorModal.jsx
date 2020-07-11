import React from 'react'
import './ErrorModal.css'

const ErrorModal = (props) => {

    const handleHideError = () => {
        props.errorRef.current.className = 'errorModal';
    };

    return (
        <div ref={props.errorRef} className='errorModal'>
            <h3 style={{margin: '3px'}}>{props.errorText}</h3>
            <button className='formBtn' onClick={handleHideError}>Ok</button>
        </div>
    )
};

export default ErrorModal;