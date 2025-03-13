import React from 'react'

const Cart = ({children, bg="g-gray-100"}) => {
    return (
        <div className={`${bg} p-6 rounded-lg shadow-md`}>
            {children}
        </div>
    )
}

export default Cart