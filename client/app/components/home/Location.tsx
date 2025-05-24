import React from 'react'

function Location() {
    return (
        <div className='w-full h-[700px]'>
            
            <p className="text-4xl text-gray-700 font-medium my-2">Местоположение</p>

            <div className="w-full h-[95%] flex flex-wrap flex-row gap-x-3 gap-y-3 p-3">
                <div className='w-full h-full rounded-xl bg-white shadow-lg border border-gray-100'></div>
            </div>
        </div>
    )
}

export default Location