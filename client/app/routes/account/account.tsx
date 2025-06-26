import { FIREBASE_AUTH } from '@config/firebaseConfig';
import { useGlobalContext } from '@config/GlobalContext';
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import changeUsername from '@use/user/changeUsername';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import changePassword from '~/use/user/changePassword';
import { useNavigate } from 'react-router';

export default function account() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('...');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [editModeEnabled, setEditModeEnabled] = useState(false);
    const [oldUsername, setOldUsername] = useState('');
    const [username, setUsername] = useState('...');

    const { loading, setLoading, setIsAdmin, isAdmin } = useGlobalContext();

    useEffect(() => {
        if (!isAdmin) {
            navigate('/'); // Redirect non-admin users to the home page
            return;
        }

        const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
            if (user) {
                setEmail(user.email || '...');
                const username = localStorage.getItem('username');
                setUsername(username || '...');
                setOldUsername(username || '...');
                setIsAuthenticated(true);
            } else {
                setEmail('...');
            }
        });
    
        return () => unsubscribe(); // Cleanup the listener on unmount
    }, [isAdmin, navigate]);

    const resetGlobalContext = async () => {
        setLoading(false);
        setIsAdmin(false);
    }

    return (
        <div className="w-full h-full font-rubik py-12 px-[11%]"> 
                
            <p className="text-3xl text-black mt-5 font-semibold">
                Акаунт
            </p>

            <div className='flex flex-row justify-between pr-4'>
                <p className='text-lg font-medium mt-4'>Потребител</p>

                {(editModeEnabled && !loading) ? (
                    <div className='flex flex-row gap-x-3'>

                        <button 
                            className='w-[70px] h-8 border border-gray-200 
                            shadow-md rounded-lg flex flex-row items-center justify-center 
                            gap-x-2 active:opacity-60'
                            onClick={() => {
                                setEditModeEnabled(!editModeEnabled)
                                setUsername(oldUsername)
                            }}
                        >
                            <p>Отказ</p>
                        </button>

                        <button 
                            className={`w-[70px] h-8 bg-red-400 text-white 
                            shadow-md rounded-lg flex items-center justify-center 
                            gap-x-2 active:opacity-60 
                            ${username === localStorage.getItem('username') ? 'opacity-60' : 'opacity-100'}`}

                            onClick={async () => {
                                if (username !== oldUsername) {
                                    setLoading(true);
                                    await changeUsername(username, oldUsername, setUsername);
                                    setEditModeEnabled(false)
                                    setLoading(false)
                                }
                            }}
                        >
                            <p>Запази</p>
                        </button>

                    </div>
                ) : (!editModeEnabled && !loading) ? (
                    <button 
                        className={
                            `w-[120px] h-8 border border-gray-200 
                            shadow-md rounded-lg flex flex-row items-center justify-center 
                            gap-x-2 active:opacity-60`
                        }

                        onClick={() => {
                            setEditModeEnabled(!editModeEnabled)
                        }}
                    >
                        <p>Промени</p>
                        <FontAwesomeIcon icon={faEdit} className='text-black mt-[-1px]'/>
                    </button>
                ) : (
                    null
                )}
            </div>
            <div className='w-full h-[2px] bg-gray-100 rounded-full mt-2'></div>

            <div className='flex flex-row gap-x-16 mt-6'>
                <div>
                    {!loading && (
                        <div  className={`flex flex-col ${editModeEnabled ? 'gap-y-6' : 'gap-y-6'}`}>
                            <p>Имейл</p>
                            <p>Парола</p>
                        </div>
                    )}
                </div>
            
                
                {(editModeEnabled && !loading) ? (
                    <div className='flex flex-col gap-y-4'>

                        <p>{email}</p>
                        
                        <input 
                            type="text"
                            maxLength={16}
                            defaultValue={username || ''}
                            className='border border-gray-300 rounded-md w-64 h-8 px-2'
                            onChange={(event) => {setUsername(event.target.value)}}
                        />
                        
                        <button 
                            className='w-[160px] h-8 border border-gray-200 
                            shadow-md rounded-lg flex flex-row items-center justify-center 
                            gap-x-2 active:opacity-60'
                            onClick={() => {
                                changePassword();
                            }}
                        >
                            <p>Готово</p>
                        </button>
                    </div>
                ) : (!editModeEnabled && !loading) ? (
                    <div className='flex flex-col gap-y-6'>
                        <p>{FIREBASE_AUTH.currentUser?.email || '...'}</p>
                        <p>*******</p>
                    </div>
                ) : (
                    <div>
                        <p className='text-xl font-medium'>1 Секунда...</p>
                    </div>
                )}
            </div>

            <div className='mt-12'>
                <button onClick={async () => {

                    if (!isAuthenticated) {
                        return
                    }

                    setLoading(true);
                    FIREBASE_AUTH.signOut();
                    await resetGlobalContext();
                    
                    navigate('/');
                }}>
                    <p className='text-xl p-5 bg-red-400 rounded-xl text-white font-bold mt-3 shadow-md hover:opacity-70'>Изход</p>
                </button>
            </div>
        </div>
    )
}
