export const standardizeDate = (date: any) => {
    const formatDate = (dateObj: Date) => {
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1; // Months are zero-based
        const day = dateObj.getDate();
        const monthNames = [
            'Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни',
            'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'
        ];
        const monthName = monthNames[month - 1];
        return `${day} ${monthName} ${year}`;
    };

    if (typeof date === 'string') {
        const dateParts = date.split('-');
        const year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based
        const day = parseInt(dateParts[2], 10);
        return formatDate(new Date(year, month, day));
    }

    if (date instanceof Date) {
        return formatDate(date);
    }

    if (typeof date === 'number') {
        return formatDate(new Date(date));
    }

    throw new Error('Invalid date format');
};
