import React from 'react'
import { IoIosGrid, IoIosListBox, } from 'react-icons/io'

function home() {
    return (
        <>
            <div className='h-12 bg-blue-400'></div>
            <div className='h-12 bg-red-400'></div>
            <div className='overflow-scroll mt-2 w-8/12 h-screen p-4  flex-grow bg-orange-500'>
                <div className='h-96 w-full bg-primary'></div>
                <div className='h-96 w-full'></div>
                <div className='h-96 w-full'></div>
                <div className='h-96 w-full bg-green-500'></div>
                <div className='h-96 w-full bg-blue-500'></div>
                <div className='h-96 w-full bg-red-500'></div>
                <div className='h-96 w-full bg-yellow-500'></div>
                <div className='min-h-[24rem] w-full relative bg-blue-500 shadow-xl shadow-red-900 '>
                    <div className=' bottom-0 w-full h-12 absolute border-2 border-yellow-200  bg-red-400 '></div>
                </div>
            </div>
        </>
    )
}

export default home