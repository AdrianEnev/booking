//import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const Header = () => {

    const navigate = useNavigate();

    return (
        <div className='w-auto h-16 m-2 mt-3 px-[10%] flex items-center font-rubik'>
            
            <div className='flex w-full flex-row justify-between items-center mx-4'>

                <div className='flex flex-row gap-x-3'> 

                    <button onClick={() => {
                        // navigate to instagram page
                    }}>
                        <img src='../../../assets/viktor_cuts_logo.jpg' alt='logo' className='w-12 h-12 rounded-full'/>
                    </button>

                    <button onClick={() => {
                        //navigate('/')
                    }}>
                        <h1 className='text-2xl font-bold'>Victor Cuts</h1>
                    </button>

                    
                </div>
                
                <div className='flex flex-row gap-x-5'>

                    <button onClick={() => {
                        console.log('navigating to /login')
                        navigate('/login')
                    }}>
                        <p className='text-lg text-[#111111] font-medium hover:opacity-60 flex flex-row gap-x-2'>
                           Акаунт
                        </p>
                    </button>

                    <button 
                    className='w-24 h-10 p-2 rounded-full bg-[#E53935] flex items-center justify-center hover:opacity-70'
                        onClick={() => {
                            //navigate('/contact')
                        }}
                    >
                        <p className='text-base font-medium text-white'>Връзка</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header