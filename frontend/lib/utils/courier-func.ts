import axios from 'axios'

export const sendEmailReceipt = async (
    firstName: string,
    orderId: string,
    email: string,
    totalAmount: number,
    amountPaid: number,
    payCurrency: string,
    items: any[]
) => {
    const balance = totalAmount - amountPaid

    try {
        await axios.post('api/email/send-receipt', {
            firstName,
            orderId,
            email,
            totalAmount,
            amountPaid,
            balance,
            payCurrency,
            items,
        })
    } catch (error) {
        console.error('Error sending email:', error)
    }
}

export const sendEmailReceiptFailed = async (
    firstName: string,
    orderId: string
) => {
    const failed = true
    try {
        await axios.post('api/email/send-receipt', {
            firstName,
            orderId,
            failed,
        })
    } catch (error) {
        console.error('Error sending email:', error)
    }
}

export const sendEmailReceiptBank = async (
    firstName: string,
    orderId: string,
    email: string,
    totalAmount: number,
    amountPaid: number,
    payCurrency: string,
    bankCurrency: string,
    items: any[]
) => {
    const balance = totalAmount - amountPaid
    try {
        await axios.post('api/email/send-receipt', {
            firstName,
            orderId,
            email,
            totalAmount,
            amountPaid,
            balance,
            payCurrency,
            bankCurrency,
            items,
        })
    } catch (error) {
        console.error('Error sending email:', error)
    }
}
