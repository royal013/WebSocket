import React from 'react'
const input = ({ name, placeholder, handleInput }) => {
    return (
        <div>
            <input name={name} className='input_field' placeholder={placeholder} onChange={handleInput} />
        </div>
    )
}

export default input
