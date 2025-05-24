import React from 'react'

function MonthDay({index, day, numberOfDays}: any) {

    return (
        <div 
            key={index} 
            className={`flex py-4 px-5
                text-black font-medium ${numberOfDays >= 30 ? 'h-1/5' : 'h-1/4'} w-1/7 
                border border-gray-100 
                ${
                    index == 29 ? 'rounded-bl-xl' : 
                    index >= 1 && index <= 7 ? 'rounded-x-xl' : 
                    ''
                }
                hover:bg-gray-50 transition-colors duration-200 cursor-pointer
            `}
        >
            {day}
        </div>
    )
}

export default MonthDay