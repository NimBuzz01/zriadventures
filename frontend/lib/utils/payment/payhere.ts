import {
    PAYHERE_LIVE_API_URL,
    PAYHERE_MERCHANT_ID,
    PAYHERE_MERCHANT_SECRET,
} from '@/app.config'
import md5 from 'crypto-js/md5'

interface OrderDetails {
    return_url: string
    cancel_url: string
    notify_url: string
    first_name: string
    last_name: string
    email: string
    phone: string
    address: string
    city: string
    country: string
    order_id: string
    items: string
    currency: string
    amount: number
}

const merchantId = PAYHERE_MERCHANT_ID
const merchantSecret = PAYHERE_MERCHANT_SECRET
const apiUrl = PAYHERE_LIVE_API_URL

function generatePayHereHash(orderDetails: OrderDetails): string {
    let orderId = orderDetails.order_id
    let amount = orderDetails.amount
    let hashedSecret = md5(merchantSecret).toString().toUpperCase()
    let amountFormated = parseFloat(amount.toString())
        .toLocaleString('en-us', { minimumFractionDigits: 2 })
        .replaceAll(',', '')
    let currency = orderDetails.currency
    let hash = md5(
        merchantId + orderId + amountFormated + currency + hashedSecret
    )
        .toString()
        .toUpperCase()
    return hash
}

async function initiatePayHerePayment(
    orderDetails: OrderDetails
): Promise<void> {
    const hash = generatePayHereHash(orderDetails)

    // Convert amount to string
    const params = {
        merchant_id: merchantId,
        hash: hash,
        ...orderDetails,
        amount: orderDetails.amount.toString(),
    }

    try {
        createAndSubmitForm(apiUrl, params)
    } catch (error) {
        throw error
    }
}

function createAndSubmitForm(
    url: string,
    params: Record<string, string>
): void {
    const formInputs = Object.entries(params)
        .map(
            ([key, value]) =>
                `<input type="hidden" name="${key}" value="${value}" />`
        )
        .join('\n')

    const formHtml = `
      <html>
      <head>
        <script>
          $(function(){
            $("#redirect_form").submit();
          });
        </script>
      </head>
      <body>
        <form id="redirect_form" method="post" action="${url}">
          ${formInputs}
        </form>
      </body>
      </html>
    `

    const doc = new DOMParser().parseFromString(formHtml, 'text/html')
    const formElement = doc.getElementById(
        'redirect_form'
    ) as HTMLFormElement | null

    if (formElement) {
        document.body.appendChild(formElement)
        formElement.submit()
    }
}

export { initiatePayHerePayment }
