import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { standardizeDate } from "@use/credentials/useStandardizeDate";
import { standardizeService } from "@use/credentials/useStandardizeService";
import { validateCredentials } from "@use/credentials/useValidateCredentials";
import postAppointment from "~/use/booking/post/usePostAppointment";
import { useGlobalContext } from "@config/GlobalContext";

const bookAppointment = () => {

    const {isAdmin, loading, setLoading} = useGlobalContext();

    const navigate = useNavigate();

    const { service, date, hour } = useParams<{ service: string, date: string, hour: string }>();
    const standardizedDate = standardizeDate(date ?? '')
    const standerdizedService = standardizeService(service ?? '')

    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [note, setNote] = useState('');

    const book = async () => {

        if (loading) return;
        if (!service || !date || !hour) return;

        // Validate credentials
        if (!customerName || !customerPhone || !customerEmail) {
            return;
        }

        if (await validateCredentials(customerEmail, customerPhone, customerName) == false) {
            return;
        }

        setLoading(true);
        await postAppointment(
            customerName,
            customerPhone,
            customerEmail,
            service,
            date,
            hour,
            note,
            setLoading,
            navigate,
            isAdmin
        )
        setLoading(false);
    }

    return (
        <div className="w-full h-full px-[10%] pt-32 mb-16 font-manrope">
            
            <div className='mb-8 ml-8'>
                <p className='text-4xl font-medium mb-3'>Запиши час</p>
                <p className='text-xl text-gray-500 mb-3'>{standardizedDate} - {hour}ч.</p>
                <p className='text-xl text-gray-500 mb-3'>{standerdizedService}</p>
                <div className='w-full h-1 bg-gray-100 rounded-xl'></div>
            </div>

            <div className="w-full h-full">
                 <div className="mx-8 mt-3 w-1/2 h-94 border border-gray-100 shadow-lg rounded-2xl p-3">

                    <input 
                        type="text" 
                        placeholder="Име"
                        className="w-full h-12 rounded-lg border border-gray-300 p-2 mb-3"
                        onChange={(e) => setCustomerName(e.target.value)}
                        maxLength={20}
                    />

                    <input 
                        type="text" 
                        placeholder="Телефон"
                        className="w-full h-12 rounded-lg border border-gray-300 p-2 mb-3"
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        maxLength={10}
                    />
                    
                    <input 
                        type="text" 
                        placeholder="Имейл"
                        className="w-full h-12 rounded-lg border border-gray-300 p-2 mb-3"
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        maxLength={35}
                    />
                    <textarea 
                        placeholder="Допълнителна информация"
                        className="w-full h-24 rounded-lg border border-gray-300 p-2 mb-3"
                        onChange={(e) => setNote(e.target.value)}
                        maxLength={50}
                    />

                    <button className="w-full h-12 rounded-lg bg-red-400 shadow-md hover:opacity-80"
                        onClick={() => {
                            book();
                        }}
                    >
                        <p className="text-lg text-white font-bold">Запиши час</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default bookAppointment