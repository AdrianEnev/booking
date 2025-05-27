function contact() {
    return (
        <div className="w-full h-full px-[10%] pt-6 mb-16 font-manrope">
            <div className="w-full h-full flex flex-row gap-x-[10%] items-center justify-center">
                <div className='w-full h-full flex flex-col max-w-[40%] justify-center mt-[-8%]'>
                    <div className='mb-8'>
                        <p className='text-6xl font-medium mb-5'>Свържете се с мен</p>
                        <p className='text-2xl text-gray-500 ml-1'>Можете да ми пишете по инстаграм или по имейл! </p>
                    </div>

                    <div className='flex flex-col gap-y-3 ml-1'>
                        <div className='flex flex-row gap-x-3'>
                            <p className='font-bold text-xl text-blue-500'>PHONE</p>
                            <p className='font-medium text-lg'>0899999999</p>
                        </div>

                        <div className='flex flex-row gap-x-3'>
                            <p className='font-bold text-xl text-red-500'>INSTA</p>
                            <p className='font-medium text-lg'>viktor_cuts</p>
                        </div>

                        <div className='flex flex-row gap-x-3'>
                            <p className='font-bold text-xl text-green-500'>EMAIL</p>
                            <p className='font-medium text-lg'>viktor@viktorcuts.com</p>
                        </div>
                    </div>
                </div>

                <div className="w-1/2 h-[60%] bg-[#f8f8f8] shadow-lg border border-gray-300 rounded-xl pt-6 px-6">
                    <p className="text-black text-4xl font-medium">Изпрати съобщение</p>

                    <form className="w-full h-full flex flex-col gap-y-3 mt-5">
                        <input type="text" placeholder="Име" className="w-full p-3 border border-gray-300 shadow-sm rounded-xl"  />
                        <input type="email" placeholder="Имейл" className="w-full p-3 border border-gray-300 shadow-sm rounded-xl"  />
                        <textarea placeholder="Съобщение" className="w-full p-3 border border-gray-300 shadow-sm rounded-xl"></textarea>
                        <button 
                            type="submit" 
                            className="bg-[#567bb1] text-white text-lg font-medium shadow-sm p-3 rounded-xl
                            
                            hover:opacity-80 transition-colors duration-200"
                        >
                            Изпрати
                        </button>
                    </form>
                </div>
            </div>
        </div>  
    )
}

export default contact