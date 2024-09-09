import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Scaffold = () => {
    return <div className='w-full flex flex-col relative bg-slate-100 flex-grow overflow-hidden max-h-screen '>
        <div className='min-h-[3.5rem] h-14 w-full flex items-center justify-between px-4 text-xl font-bold bg-white border-b'>
            <Link to={'/'} className='flex items-center gap-4  flex-row'>
                <div className='relative items-center flex w-5'>
                    <div className='w-8 h-8 absolute left-0 bg-emerald-600 rounded-full'></div>
                    <div className='w-8 h-8 absolute left-4 bg-blue-500 rounded-full'></div>
                    <div className='w-8 h-8 absolute left-8 bg-black rounded-full'></div>
                </div>
                <div className='ml-10'> Bettermode community</div>
            </Link>
            <div className='flex gap-3'>
                <Link to={'login'}>SignIn</Link>
                <span>/</span>
                <span>SignUp</span>
            </div>
        </div>
        <Outlet />
    </div>
}

export default Scaffold