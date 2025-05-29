import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
import { standardizeService } from './standardizeService';
import { standardizeDate } from './useStandardizeDate';
dotenv.config();

const sendAppointmentEmail = async (
    customerEmail: string, verificationToken: any, appointmentVerified: boolean,
    service: string, appointmentDate: Date, hour: string
) => {
    // appointmentVerified => send verified email, showing info about the appointment
    // !appointmentVerified => send confirmation email, before the appointment is verified

    const simplifiedService = standardizeService(service);
    const simiplifiedDate = standardizeDate(appointmentDate);

    // Configure the Mailtrap transporter
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.BACKEND_MAILTRAP_USER,
            pass: process.env.BACKEND_MAILTRAP_PASS
        }
    });

    // Email content
    const subject = appointmentVerified
        ? 'Успешно записахте час'
        : 'Потвърдете вашия час';
    const html = appointmentVerified
        ? `<p>Успешно записахте час!</p>
           <p>Услуга: ${simplifiedService}</p>
           <p>Дата: ${simiplifiedDate}</p>
           <p>Час: ${hour}</p>`
        : `<p>Моля, потвърдете вашия час, като кликнете на линка по-долу:</p>
           <a href="http://localhost:3000/api/booking/verify?token=${verificationToken}">Потвърдете час</a>
           <p>Услуга: ${simplifiedService}</p>
           <p>Дата: ${simiplifiedDate}</p>
           <p>Час: ${hour}</p>`;

    // Send the email
    try {
        await transporter.sendMail({
            from: 'adrian@adriancuts.com', // Sender address
            to: customerEmail, // Recipient address
            subject: subject, // Subject line
            html: html, // HTML body
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
    return
}

export default sendAppointmentEmail;