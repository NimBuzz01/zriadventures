import { EMAIL_SENDER_EMAIL, KOKO_PUBLIC_KEY } from '@/app.config'
import { setPaymentStatus } from '@/lib/utils/api'
import { NextResponse } from 'next/server'
import * as crypto from 'crypto'
import { sendEmail } from '@/lib/utils/func'
import { NEW_PAYMENT_RECEIVED } from '@/constants/emailTemplates/SubjectConstants'
import { createKokoNotifyEmail } from '@/constants/emailTemplates/PaymentNotification'

export async function POST(request: Request) {
    try {
        const data = await request.formData()
        const orderId = data.get('orderId')?.toString()
        const trnId = data.get('trnId')?.toString()
        const status = data.get('status')?.toString()
        const desc = data.get('desc')?.toString()
        const signature = data.get('signature')?.toString()

        const publicKey = KOKO_PUBLIC_KEY

        // Verify the signature using the publicKey
        // const verifySignature = (
        //     data: string,
        //     signature: string,
        //     publicKey: string
        // ) => {
        //     const verify = crypto.createVerify('RSA-SHA256')
        //     verify.update(data)
        //     const isVerified = verify.verify(publicKey, signature, 'base64')
        //     return isVerified
        // }

        if (status && orderId && trnId && signature) {
            const dataString = `${orderId}${trnId}${status}` // Update this with the correct format you want to verify

            // Verify the signature
            // const isVerified = verifySignature(dataString, signature, publicKey)
            // await sendEmail(
            //     EMAIL_SENDER_EMAIL,
            //     'HI',
            //     status +
            //         '|||' +
            //         orderId +
            //         '|||' +
            //         trnId +
            //         '|||' +
            //         desc +
            //         '|||' +
            //         signature
            // )

            if (status === 'SUCCESS') {
                await setPaymentStatus(orderId, 'SUCCESS')
                await sendEmail(
                    EMAIL_SENDER_EMAIL,
                    NEW_PAYMENT_RECEIVED,
                    await createKokoNotifyEmail(
                        orderId,
                        'KOKO',
                        'SUCCESS',
                        trnId
                    )
                )
                return NextResponse.json({
                    message: 'Payment processed successfully',
                    status: 200,
                })
            } else {
                await setPaymentStatus(orderId, 'FAILED')
                return NextResponse.json({
                    message: 'Payment failed',
                    status: 400,
                })
            }
        }
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            message: 'Internal server error',
            status: 500,
        })
    }
}
