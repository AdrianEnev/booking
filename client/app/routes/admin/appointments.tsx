import { useGlobalContext } from '@config/GlobalContext';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

export default function appointments() {

    const { isAdmin } = useGlobalContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin) {
            navigate('/'); // Redirect non-admin users to the home page
            return;
        }
    }, [])

    return (
        <div>admin - appointments</div>
    )
}
