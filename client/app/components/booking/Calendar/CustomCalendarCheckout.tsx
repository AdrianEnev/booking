import React, { useState } from 'react';
import bookAppointment from '@use/booking/post/useBookAppointment';
import { standardizeDate } from '~/use/credentials/useStandardizeDate';

interface CustomCalendarCheckoutProps {
    selectedDate: Date,
    selectedHour: string;
    selectedService: string;
    setSelectedService: (hour: string) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    navigate: any;
    isAdmin: boolean;
}

function CustomCalendarCheckout({
    selectedDate, selectedHour, selectedService, setSelectedService,
    loading, setLoading, navigate, isAdmin
}: CustomCalendarCheckoutProps) {

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone: '',
        additionalInfo: '',
    });

    // Keeps track of form information
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handles form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Converts date to YYYY-MM-DD format
        const formattedDate = selectedDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
       
        await bookAppointment(
            loading,
            setLoading,
            selectedService,
            formattedDate,
            selectedHour,
            formData.name,
            formData.phone,
            formData.email,
            formData.additionalInfo,
            navigate,
            isAdmin
        )
    };

    return (
        <div
            className='w-full h-[93%] bg-white rounded-xl shadow-lg border border-gray-300 font-manrope'
        >
            {/* Header */}
            <div className='w-full h-[8%] bg-[#f8f8f8] rounded-x-xl rounded-t-xl border-b border-gray-300 flex flex-row items-center gap-x-6'>
                <button className='w-16 h-full border-r border-gray-300 mt-[-4px]
                    hover:opacity-40 transition-colors duration-200 cursor-pointer
                '
                    onClick={() => {
                        setSelectedService('')
                    }}
                >
                    <p className='text-4xl text-[#4a6fa5]'>{'<'}</p>
                </button>
                
                <div className='flex flex-row w-1/2 h-full items-center gap-x-3'>
                    <p className='text-2xl font-semibold text-[#403f3f] w-1/2 border-r border-gray-300'>
                        {standardizeDate(selectedDate)}
                    </p>

                    <p className='text-2xl font-semibold text-[#403f3f] w-1/2 border-r border-gray-300'>
                        {selectedHour}
                    </p>
                    
                    <p className='text-2xl font-semibold text-[#403f3f] w-1/2'>
                        {selectedService}
                    </p>
                </div>
            </div>

            <div className="max-w-2xl mx-auto p-6 h-[80%] flex items-center">
                <form className="grid grid-cols-1 gap-4 w-full" onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Имейл" 
                        className="w-full p-3 border border-gray-300 shadow-sm rounded-xl" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                    />
                    <input 
                        type="text" 
                        name="name"
                        placeholder="Име" 
                        className="w-full p-3 border border-gray-300 shadow-sm rounded-xl" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                    />
                    <input 
                        type="tel" 
                        name="phone"
                        placeholder="Телефонен номер" 
                        className="w-full p-3 border border-gray-300 shadow-sm rounded-xl" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        required 
                    />
                    <input 
                        type="text" 
                        name="additionalInfo"
                        placeholder="Допълнителна информация" 
                        className="w-full p-3 border border-gray-300 shadow-sm rounded-xl" 
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                    />
                    <button 
                        type="submit" 
                        className="bg-[#567bb1] text-white text-lg font-medium shadow-sm p-3 rounded-xl
                        
                        hover:opacity-80 transition-colors duration-200"
                    >
                        Запиши ме
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CustomCalendarCheckout;