import {
    EMAIL_SENDER_EMAIL,
    EMAIL_SENDER_EXTRAS,
    EMAIL_SENDER_HOST,
    EMAIL_SENDER_PASSWORD,
} from '@/app.config'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const emailHost = EMAIL_SENDER_HOST
const emailSender = EMAIL_SENDER_EMAIL
const emailPassword = EMAIL_SENDER_PASSWORD

const receivers = EMAIL_SENDER_EMAIL + ', ' + EMAIL_SENDER_EXTRAS

export async function POST(request: Request) {
    try {
        // Extract data from the request body
        const { recipientEmail, subject, body } = await request.json()

        const transporter = nodemailer.createTransport({
            host: emailHost,
            port: 465,
            secure: true,
            auth: {
                user: emailSender,
                pass: emailPassword,
            },
        })

        if (recipientEmail === emailSender) {
            await transporter.sendMail({
                from: emailSender,
                to: receivers,
                subject: subject,
                html: body,
            })
        } else {
            await transporter.sendMail({
                from: emailSender,
                to: recipientEmail,
                subject: subject,
                html: body,
            })
        }

        return NextResponse.json({
            message: 'Email sent successfully',
            status: 200,
        })
    } catch (error) {
        console.error('Error sending email:', error)
        return NextResponse.json({
            message: 'Email could not be sent',
            status: 500,
        })
    }
}
