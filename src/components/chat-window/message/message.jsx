import React from 'react';

function Message(props) {
    const {content, nameOfClass} = props

    const imgRegEx = /png$|jpg$|jpeg$|gif$/;

    return (
        <li className={nameOfClass}>
            <div style={{ margin: '0px' }}>
                {imgRegEx.test(content.message) ?
                    <a target="_blank" className='imgLink' rel="noopener noreferrer" href={content.message}>
                        <img src={content.message} style={{ maxWidth: '100%', maxHeight: '100%' }} alt={content.message} />
                    </a> :
                    content.message
                }
            </div>
            <div>
                <small className='smallName'>{content.user || content.from}</small>
            </div>
        </li>
    )
}

export default Message