import { setPaymentStatus } from '@/lib/utils/api'
import { NextResponse } from 'next/server'
import { EMAIL_SENDER_EMAIL, PAYHERE_MERCHANT_SECRET } from '@/app.config'
import crypto from 'crypto'
import { sendEmail } from '@/lib/utils/func'
import { NEW_PAYMENT_RECEIVED } from '@/constants/emailTemplates/SubjectConstants'
import { createPayhereNotifyEmail } from '@/constants/emailTemplates/PaymentNotification'

export async function POST(request: Request) {
    try {
        const data = await request.formData()
        const merchant_id = data.get('merchant_id')?.toString()
        const order_id = data.get('order_id')?.toString()
        const payhere_amount = data.get('payhere_amount')?.toString()
        const payhere_currency = data.get('payhere_currency')?.toString()
        const status_code = data.get('status_code')?.toString()
        const md5sig = data.get('md5sig')?.toString()

        const merchant_secret = PAYHERE_MERCHANT_SECRET

        if (merchant_id && order_id) {
            const dataToHash = `${merchant_id}${order_id}${payhere_amount}${payhere_currency}${status_code}${crypto
                .createHash('md5')
                .update(merchant_secret)
                .digest('hex')
                .toUpperCase()}`

            // Create an MD5 hash
            const local_md5sig = crypto
                .createHash('md5')
                .update(dataToHash)
                .digest('hex')
                .toUpperCase()

            if (
                local_md5sig === md5sig &&
                status_code === '2' &&
                payhere_currency &&
                payhere_amount
            ) {
                await setPaymentStatus(order_id, 'SUCCESS')
                const request = await createPayhereNotifyEmail(
                    order_id,
                    'PAYHERE',
                    payhere_currency,
                    payhere_amount,
                    'SUCCESS'
                )
                await sendEmail(
                    EMAIL_SENDER_EMAIL,
                    NEW_PAYMENT_RECEIVED,
                    request
                )
                return NextResponse.json({
                    message: 'Payment processed successfully',
                    status: 200,
                })
            } else {
                await setPaymentStatus(order_id, 'FAILED')
                return NextResponse.json({
                    message: 'Payment failed',
                    status: 400,
                })
            }
        }
    } catch (error) {
        return NextResponse.json({
            message: 'Internal server error',
            status: 500,
        })
    }
}
