function MonthDay({
    index, day, numberOfDays, selectedDate, setSelectedDate, setInitialDateSelected, bookedDays
}: any) {
    return (
        <button 
            key={index} 
            className={`flex py-4 px-5 text-sm sm:text-base
                text-black font-medium ${numberOfDays > 35 ? 'h-1/6' : 'h-1/5'} w-1/7 
                border border-gray-100 
                ${
                    index == 29 ? 'rounded-bl-xl' : 
                    index >= 1 && index <= 7 ? 'rounded-x-xl' : 
                    ''
                }
                ${bookedDays.includes(day) ? 'bg-red-400 cursor-not-allowed' : 'hover:bg-gray-50 transition-colors duration-200 cursor-pointer'}
            `}
            onClick={() => {
                setInitialDateSelected(true)

                // Get new date by retrieving the day number (1-31) from the "day" number variable and the selected month from the "selectedDate" Date variable
                const newDate = new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    day
                );
                setSelectedDate(newDate);
            }}
        >
            {day}
        </button>
    )
}

export default MonthDay