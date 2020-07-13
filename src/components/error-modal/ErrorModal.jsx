import React from 'react'
import './ErrorModal.css'

const ErrorModal = ({ errorRef, errorText }) => {

    const handleHideError = () => {
        errorRef.current.className = 'errorModal';
    };

    return (
        <div ref={errorRef} className='errorModal'>
            <h3 style={{ margin: '3px' }}>{errorText}</h3>
            <button className='formBtn' onClick={handleHideError}>Ok</button>
        </div>
    )
};

export default ErrorModal;