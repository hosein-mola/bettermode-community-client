import React from 'react'
import { IoLogoApple, IoLogoGoogle, IoMdLogIn } from "react-icons/io";

const LoginPage = () => {
    return (
        <div className='w-full flex-grow bg-slate-100 flex justify-center items-center'>
            <div className='flex flex-row gap-4 bg-white w-full justify-center md:w-10/12 lg:w-8/12 xl:w-7/12 2x:w-7/12  shadow-2xl shadow-blue-400 min-h-screen h-auto lg:min-h-[40dvh] xl:min-h-[50dvh]  rounded-2xl '>
                <div className=' lg:w-6/12 w-full gap-4 border-r px-8 py-6 flex-grow flex flex-col items-center justify-between'>
                    <div className='text-5xl font-bold h-auto flex items-center text-black'>
                        Login
                    </div>
                    <div className='w-full flex gap-2 flex-col'>
                        <div className='flex flex-col text-sm w-full gap-2'>
                            <label className=' text-primary '>Netwrok</label>
                            <div className='grid grid-cols-5 w-full items-center'>
                                <input placeholder='community domain prefix' className='h-12  w-full col-span-3 rounded-l text-black p-2 bg-slate-100 border-r-0 border-2 focus:outline-none focus:shadow-outline focus:border-2 focus:border-primary' />
                                <div className='flex font-bold tracking-widest  text-black text-xs  h-12 col-span-2 rounded-r p-2 text-center justify-center bg-slate-100 border-2  border-l focus:outline-none focus:shadow-outline focus:border-2 focus:border-primary items-center'>.bettermode.com</div>
                            </div>
                        </div>
                        <div className='flex flex-col text-sm w-full gap-2'>
                            <label className=' text-primary '>Email</label>
                            <input placeholder='example@gmail.com' className='h-12  v rounded-lg text-black p-2 bg-slate-100 border-2 focus:outline-none focus:shadow-outline focus:border-2 focus:border-primary  ' />
                        </div>
                        <div className='flex flex-col text-sm w-full gap-2'>
                            <label className=' text-primary '>Password</label>
                            <input placeholder='community member password' type='password' className='h-12  w-full rounded-lg   p-2 bg-slate-100 border-2 focus:outline-none focus:shadow-outline focus:border-2 focus:border-primary ' />
                        </div>
                    </div>
                    <div className='flex flex-col text-sm justify-end w-full gap-2'>
                        <button className='h-12 font-bold text-lg flex flex-row justify-center items-center gap-2  w-full rounded-lg text-white  p-2 bg-black hover:bg-black/80 ' >
                            <IoMdLogIn className='w-5 h-5' />
                            <span>Sign In</span>
                        </button>
                    </div>
                    <div className='w-full h-2 relative flex flex-row gap-2 items-center'>
                        <hr className=' bg-black border-b w-full' />
                        <span className='  font-bold'>Or</span>
                        <hr className=' bg-black border-b w-full' />
                    </div>
                    <div className='flex w-full h-14 gap-2'>
                        <button className='w-full rounded-lg border flex gap-2 items-center justify-center hover:bg-slate-100'>
                            <IoLogoApple className='w-5 h-5' />
                            <span className='font-bold'>Apple</span>
                        </button>
                        <button className='w-full rounded-lg border flex gap-2 items-center justify-center hover:bg-slate-100'>
                            <IoLogoGoogle className='w-5 h-5' />
                            <span className='font-bold'>Google</span>
                        </button>
                    </div>
                </div>
                <div className='lg:w-6/12 lg:flex flex-col justify-center items-center gap-4 py-2 hidden font-bold rounded-2xl'>
                    <img alt='side-image' width={'45%'} height={'100%'} src='/public/side.svg' />
                    <div className='flex gap-2 flex-col'>
                        <h1 className='text-3xl text-center text-primary'>Your Circle, Your Strength.</h1>
                        <h1 className='text-2xl text-center text-black'>bettermode community</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage