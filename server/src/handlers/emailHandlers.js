import nodemailer from 'nodemailer'
import { emailMessagePattern } from '../config/config.js'
import rateHandler from '../handlers/rateHandler.js'

const emailHandlers = async (subscriptions) => {
        try {
            console.log('Start')
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        const currency = await rateHandler('UAH')
        const htmlMessage = emailMessagePattern(currency)

        for (const subscription of subscriptions) {
            await transporter.sendMail({
                from: process.env.GMAIL_USER,
                to: subscription.email,
                subject: 'Курс USD в UAH',
                html: htmlMessage
            })
        }
        } catch (error) {
            
        }
        

}

export default emailHandlers