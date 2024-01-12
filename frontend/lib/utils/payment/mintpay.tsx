import axios from 'axios'
import { setPaymentStatus } from '../api'
import { EMAIL_SENDER_EMAIL, MINTPAY_LIVE_GATEWAY_URL } from '@/app.config'
import { sendEmail } from '../func'
import { NEW_PAYMENT_RECEIVED } from '@/constants/emailTemplates/SubjectConstants'
import { createMintpayNotifyEmail } from '@/constants/emailTemplates/PaymentNotification'

const gatewayUrl = MINTPAY_LIVE_GATEWAY_URL

// Step 1: POST purchase related information to Mintpay API
async function postPurchaseInformation(orderDetails: any) {
    try {
        const mintpayResponse = await axios.post(
            'api/payment/mintpay',
            orderDetails
        )
        return mintpayResponse.data
    } catch (error) {
        console.error('Error initiating MintPay payment:', error)
    }
}

// Step 2: Get the purchase_id value from the Success response and create a hidden form
function createHiddenForm(purchaseId: string) {
    const formHtml = `
    <form action="${gatewayUrl}" method="post">
      <input type="text" name="purchase_id" value="${purchaseId}">
    </form>
  `

    // Add the form to the document body and submit it
    const doc = new DOMParser().parseFromString(formHtml, 'text/html')
    const formElement = doc.querySelector('form')

    if (formElement) {
        document.body.appendChild(formElement)
        formElement.submit()
    }
}

// Step 3: Inquire payment status from Mintpay API
export async function inquirePaymentStatus(purchaseId: string) {
    try {
        const response = await axios.get(
            `api/payment/mintpay?purchaseId=${purchaseId}`
        )
        return response.data
    } catch (error) {
        throw error
    }
}

async function initiateMintPayPayment(orderDetails: any) {
    try {
        const purchaseResponse = await postPurchaseInformation(orderDetails)
        if (purchaseResponse && purchaseResponse.data.message === 'Success') {
            const purchaseId = purchaseResponse.data.data
            // Step 2: Create a hidden form with purchase_id
            createHiddenForm(purchaseId)
            localStorage.setItem('mp_Id', purchaseId)
        } else {
            console.error(
                'Purchase failed:',
                purchaseResponse && purchaseResponse.data.message
            )
        }
    } catch (error: any) {
        console.error('Error:', error.message)
    }
}

export { initiateMintPayPayment }

export async function getMintpayResponse(orderId: string) {
    const purchaseId = localStorage.getItem('mp_Id')
    const orderEmail = localStorage.getItem('order_email')
    if (purchaseId) {
        // Step 3: Inquire payment status
        const paymentStatusResponse = await inquirePaymentStatus(purchaseId)
        if (
            paymentStatusResponse.data &&
            paymentStatusResponse.data.message === 'Success'
        ) {
            const paymentStatus = paymentStatusResponse.data.data.status
            if (
                paymentStatus === 'Approved' &&
                (!orderEmail ||
                    (orderEmail === 'false' &&
                        paymentStatusResponse.data.data.order_id === orderId))
            ) {
                await setPaymentStatus(
                    paymentStatusResponse.data.data.order_id,
                    'SUCCESS'
                )
                await sendEmail(
                    EMAIL_SENDER_EMAIL,
                    NEW_PAYMENT_RECEIVED,
                    await createMintpayNotifyEmail(
                        'MINTPAY',
                        'SUCCESS',
                        paymentStatusResponse.data
                    )
                )
            }
        } else {
            console.error(
                'Failed to inquire payment status:',
                paymentStatusResponse.data.message
            )
            await setPaymentStatus(
                paymentStatusResponse.data.data.order_id,
                'FAILED'
            )
        }
    }
}
