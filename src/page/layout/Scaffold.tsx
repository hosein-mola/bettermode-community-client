import React from 'react'
import { Outlet } from 'react-router-dom'

const Scaffold = () => {
    return <div className='w-full h-screen'>
        <Outlet />
    </div>
}

export default Scaffold