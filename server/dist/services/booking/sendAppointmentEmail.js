"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const standardizeService_1 = require("./standardizeService");
const useStandardizeDate_1 = require("./useStandardizeDate");
dotenv_1.default.config();
const sendAppointmentEmail = (customerEmail, verificationToken, appointmentVerified, service, appointmentDate, hour) => __awaiter(void 0, void 0, void 0, function* () {
    // appointmentVerified => send verified email, showing info about the appointment
    // !appointmentVerified => send confirmation email, before the appointment is verified
    const simplifiedService = (0, standardizeService_1.standardizeService)(service);
    const simiplifiedDate = (0, useStandardizeDate_1.standardizeDate)(appointmentDate);
    // Configure the Mailtrap transporter
    const transporter = nodemailer_1.default.createTransport({
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
        yield transporter.sendMail({
            from: 'adrian@adriancuts.com', // Sender address
            to: customerEmail, // Recipient address
            subject: subject, // Subject line
            html: html, // HTML body
        });
        console.log('Email sent successfully');
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
    return;
});
exports.default = sendAppointmentEmail;
