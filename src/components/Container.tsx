import React from 'react'


const Container = ({ children }) => {
    return (
        <div className='flex relative'>
            {children}
        </div>
    )
}

export default Container