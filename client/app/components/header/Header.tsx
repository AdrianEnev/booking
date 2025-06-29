//import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const Header = ({isAdmin}: any) => {

    const navigate = useNavigate();

    return (
        <div className='w-auto h-full sm:px-[5%] md:px-[10%] pb-3 pt-5 flex items-center font-rubik'>
            <div className='flex w-full flex-row justify-between items-center mx-4'>
                <div className='flex flex-row gap-x-3'> 
                    <button onClick={() => {
                        window.open('https://www.adrianenev.com', '_blank');
                    }}>
                        <div className='w-12 h-12 bg-[#4a6fa5] rounded-full hover:opacity-60'/>
                    </button>

                    <button onClick={() => {
                        navigate('/')
                    }}>
                        <h1 className='text-xl sm:text-2xl text-black font-bold hover:opacity-60'>Adrian Cuts</h1>
                    </button>
                </div>
                
                <div className='flex flex-row gap-x-5'>

                    {/* 
                        <button onClick={() => {
                            if (isAuthenticated){
                                navigate('/account')
                                return;
                            }
                            navigate('/login')
                        }}>
                            <p className='text-lg text-[#111111] font-medium hover:opacity-60 flex flex-row gap-x-2'>
                            Акаунт
                            </p>
                        </button>

                    */}
                    
                    {isAdmin && (
                         <button onClick={() => {
                            navigate('/admin/dashboard')
                        }}>
                            <p className='text-lg text-[#111111] font-medium hover:opacity-60 flex flex-row gap-x-2'>
                               Поръчки
                            </p>
                        </button>
                    )}
                   
                    <button 
                    className='w-24 h-10 p-2 rounded-full bg-[#4a6fa5] flex items-center justify-center hover:opacity-70'
                        onClick={() => {
                            navigate('/contact')
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