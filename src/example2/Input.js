import React, { useRef } from 'react';
import uniqid from 'uniqid';

const Input = ({ type, labelText, ...props }) => {
    const id = useRef(uniqid());
    return (
        <>
            <label htmlFor={id.current}>{labelText}</label>
            {type === 'textarea' ?
                <textarea id={id.current} /> :
                <input id={id.current} {...props} />
            }
        </>
    );
}

export default Input;