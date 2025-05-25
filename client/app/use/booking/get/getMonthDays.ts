// Gets the number of days in a specific month
const getMonthDays = (value: Date) => {
    const month = value.getMonth();
    const year = value.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthDays: number[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
        monthDays.push(day);
    }

    return monthDays;
}

export default getMonthDays;