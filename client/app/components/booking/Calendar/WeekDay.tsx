const WeekDay = ({index, day}: any) => {

    return (
        <div 
            key={index} 
            className={`flex items-center justify-center h-full 
                text-black font-medium w-1/7  
                ${index == 1 ? 'border-r border-gray-100' : index == 7 ? 'border-l border-gray-100' : 'border-x border-gray-100'}
            `}
        >
            {day}
        </div>
    );
}

export default WeekDay;