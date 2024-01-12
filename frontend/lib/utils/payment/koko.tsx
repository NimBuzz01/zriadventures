import {
    KOKO_API_KEY,
    KOKO_LIVE_API_URL,
    KOKO_MERCHANT_ID,
    KOKO_PRIVATE_KEY,
} from '@/app.config'
import crypto from 'crypto'

const merchantId = KOKO_MERCHANT_ID
const apiKey = KOKO_API_KEY
const apiUrl = KOKO_LIVE_API_URL
const privateKey = KOKO_PRIVATE_KEY

interface OrderDetails {
    _returnUrl: string
    _cancelUrl: string
    _responseUrl: string
    _amount: string
    _currency: string
    _reference: string
    _orderId: string
    _pluginName: string
    _pluginVersion: string
    _description: string
    _firstName: string
    _lastName: string
    _email: string
}

function generateKokoSignature(orderDetails: OrderDetails) {
    const dataString = `${merchantId}${orderDetails._amount}${orderDetails._currency}${orderDetails._pluginName}${orderDetails._pluginVersion}${orderDetails._returnUrl}${orderDetails._cancelUrl}${orderDetails._orderId}${orderDetails._reference}${orderDetails._firstName}${orderDetails._lastName}${orderDetails._email}${orderDetails._description}${apiKey}${orderDetails._responseUrl}`

    const sign = crypto.createSign('RSA-SHA256')
    sign.write(dataString)
    sign.end()

    const signature = sign.sign(privateKey, 'base64')

    // const dataBuffer = Buffer.from(dataString, 'utf8') // Convert dataString to Buffer
    // const signatureBuffer = Buffer.from(signature, 'base64') // Convert signature to Buffer

    // const isCompliant = crypto.verify(
    //     'RSA-SHA256',
    //     dataBuffer,
    //     KOKO_PUBLIC_KEY,
    //     signatureBuffer
    // )
    // console.log(isCompliant)

    return {
        dataString: dataString,
        signature: signature,
    }
}

async function initiateKokoPayment(orderDetails: OrderDetails): Promise<void> {
    const signatureData = generateKokoSignature(orderDetails)

    // Create a form-like object
    const formData: Record<string, string> = {
        _mId: merchantId,
        api_key: apiKey,
        ...orderDetails,
        dataString: signatureData.dataString,
        signature: signatureData.signature,
    }

    // Create a hidden form and append hidden input fields to it
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = apiUrl

    // Iterate over formData and create hidden input fields
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            const input = document.createElement('input')
            input.type = 'hidden'
            input.name = key
            input.value = formData[key] // Here, use formData[key] instead of formData.key
            form.appendChild(input)
        }
    }

    // Append the form to the document and submit it
    document.body.appendChild(form)
    form.submit()
}

export { initiateKokoPayment }
