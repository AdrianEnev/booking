function contact() {
    return (
        <div className="w-full h-full px-[10%] pt-6 mb-16 font-manrope text-black">
            <div className="w-full h-full flex flex-col md:flex-row md:gap-x-[10%] 4xl:gap-x-[0%] items-center justify-center">
                <div className='w-full h-[35%] md:h-full flex flex-col md:max-w-[40%] md:justify-center md:mt-[-8%]'>
                    <div className='mb-2 md:mb-8'>
                        <p className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium mb-2 md:mb-5'>Свържете се с мен</p>
                        <p className='md:text-lg lg:text-xl xl:text-2xl text-gray-500 ml-1'>Можете да ми пишете по инстаграм или по имейл! </p>
                    </div>

                    <div className='flex flex-col md:gap-y-3 ml-1'>
                        <div className='flex flex-row gap-x-3'>
                            <p className='font-bold text-xl text-blue-500'>PHONE</p>
                            <p className='font-medium text-lg'>0899999999</p>
                        </div>

                        <div className='flex flex-row gap-x-3'>
                            <p className='font-bold text-xl text-red-500'>INSTA</p>
                            <p className='font-medium text-lg'>adrianenev</p>
                        </div>

                        <div className='flex flex-row gap-x-3'>
                            <p className='font-bold text-xl text-green-500'>EMAIL</p>
                            <p className='font-medium text-lg'>enevbuis@gmail.com</p>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2 h-[60%] 2xl:h-[50%] 3xl:h-[45%] 3xl:w-[40%] 5xl:w-[30%] bg-[#f8f8f8] shadow-lg border border-gray-300 rounded-xl pt-6 px-6">
                    <p className="text-black md:text-2xl lg:text-3xl xl:text-4xl font-medium">Изпрати съобщение</p>

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