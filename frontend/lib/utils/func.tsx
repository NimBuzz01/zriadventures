import { APP_BASE_URL, CURRENCY_EXCHANGE_API_KEY } from '@/app.config'

export const calcOffer = (price: number, offer: number) => {
    return price * (1 - offer / 100)
}

export async function convertLKRtoUSD(LKR: number) {
    const url = `http://api.exchangeratesapi.io/v1/latest?access_key=${CURRENCY_EXCHANGE_API_KEY}&symbols=LKR,USD`

    try {
        const response = await fetch(url)
        const data = await response.json()
        const rateLKRtoEUR = 1 / data.rates.LKR
        const rateEURtoUSD = data.rates.USD
        const USD = LKR * rateLKRtoEUR * rateEURtoUSD
        return USD
    } catch (error) {
        console.error('Error:', error)
    }
}

export const getCurrentDate = (separator = '') => {
    let newDate = new Date()
    let date = newDate.getDate()
    let month = newDate.getMonth() + 1
    let year = newDate.getFullYear()

    return `${year}${separator}${
        month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`
}

export const formatDate = (inputDate: Date | string) => {
    const temp = inputDate.toString()
    const dateParts = temp.split('-')
    const year = dateParts[0]
    const month = dateParts[1]
    const day = dateParts[2]

    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]

    const formattedDate = `${day} ${months[Number(month) - 1]} ${year}`
    return formattedDate
}

// Helper function to increment the orderId
export const incrementOrderId = (orderId: string) => {
    const parts = orderId.split('-')
    const numberPart = parseInt(parts[1]) // Extract the number part and convert it to an integer
    const maxNumberPart = 99999999 // Maximum value for the number part

    // Check if we've reached the maximum value
    if (numberPart >= maxNumberPart) {
        throw new Error('Maximum orderId value reached.')
    }

    const nextNumberPart = numberPart + 1

    // Use string formatting to ensure that the number part is always 8 digits with leading zeros
    const nextOrderId = `zri-${nextNumberPart.toString().padStart(8, '0')}`

    return nextOrderId
}

export async function sendEmail(
    recipientEmail: string,
    subject: string,
    body: string
) {
    return fetch(APP_BASE_URL + '/api/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            recipientEmail,
            subject,
            body,
        }),
    })
}

export function generateVoucherCode() {
    var voucher_codes = require('voucher-code-generator')

    return voucher_codes.generate({
        pattern: '####-####-####',
    })
}
