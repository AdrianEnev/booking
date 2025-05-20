const sendEmail = async (
    customerEmail: string,
    customerName: string, 
    date: string, 
    hour: string, 
    service: string
) => {
    console.log('email sent')
    return true
}

export default sendEmail;