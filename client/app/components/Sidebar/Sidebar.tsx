import { faBook, faCog, faDollar, faDumbbell, faGear } from '@fortawesome/free-solid-svg-icons'
import { FIREBASE_AUTH } from '@config/firebaseConfig'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import SidebarCategories from './SidebarCategories'

const Sidebar = () => {

    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setScreenHeight(getScreenHeight());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const getScreenHeight = () => {
        return window.innerHeight;
    }

    const navigate = useNavigate();

    return (
        <div className='w-full h-full font-manrope'>
            
            <div className='w-full h-full border-r border-gray-200 py-4 mx-2'>

                <div className='flex items-start gap-x-5'>

                    <button onClick={() => {
                        navigate('/')
                    }}
                        className='flex justify-center w-full'
                    >
                        <img src='../../../assets/viktor_cuts_logo.jpg' alt='logo' className='w-24 h-24 rounded-full'/>
                    </button>
                    
                </div>

                <div className='mt-12 flex flex-col gap-y-1'>
                    <SidebarCategories title='Дашборд' icon={faCog} route={() => navigate("/admin/dashboard")}/>
                    <SidebarCategories title='Поръчки' icon={faBook} route={() => navigate("/admin/appointments")}/>
                    <SidebarCategories title='Печалба' icon={faDollar} route={() => navigate("/admin/profit")}/>
                    
                    <p className='text-gray-500 text-sm mt-5'>Тест</p>

                    <SidebarCategories title='Календар' icon={faDumbbell} route={() => navigate("/booking")}/>
                    
                    <div className={`absolute bottom-4 ${screenHeight >= 700 ? "" : "hidden"}`}>
                        <SidebarCategories title='Настройки' icon={faGear} route={() => navigate("/account")}/>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Sidebar