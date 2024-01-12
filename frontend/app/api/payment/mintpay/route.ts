import axios from 'axios'
import { NextResponse } from 'next/server'
import {
    MINTPAY_MERCHANT_ID,
    MINTPAY_MERCHANT_SECRET,
    MINTPAY_LIVE_API_URL,
} from '@/app.config'

const apiUrl = MINTPAY_LIVE_API_URL
const merchantId = MINTPAY_MERCHANT_ID
const merchantSecret = MINTPAY_MERCHANT_SECRET

export async function POST(request: Request) {
    const orderDetails = await request.json()

    const headers = {
        Authorization: `Token ${merchantSecret}`,
        'Content-Type': 'application/json',
    }

    try {
        const response = await axios.post(apiUrl, orderDetails, { headers })
        const data = response.data
        return NextResponse.json({ data })
    } catch (error) {
        throw error
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const purchaseId = searchParams.get('purchaseId')

    try {
        const statusUrl = `${apiUrl}status/merchantId/${merchantId}/purchaseId/${purchaseId}`

        const headers = {
            Authorization: `Token ${merchantSecret}`,
            'Content-Type': 'application/json',
        }

        try {
            const response = await axios.get(statusUrl, { headers })
            const data = response.data
            return NextResponse.json({
                data,
            })
        } catch (error) {
            throw error
        }
    } catch (error) {
        return NextResponse.json({
            message: 'Internal server error',
            status: 500,
        })
    }
}
