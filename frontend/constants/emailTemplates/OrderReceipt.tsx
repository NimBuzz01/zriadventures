import { formatDate } from '@/lib/utils'
import { TNC_BANK_DETAILS } from '../pages/TermsNConditionsConstants'

export function createReceiptEmail(orderDetails: any, bank_currency?: string) {
    const getFilteredItems = (
        itemType: 'EXPERIENCE' | 'MERCHANDISE' | 'VOUCHER' | 'EVENT' | 'RENTAL'
    ) => {
        return orderDetails.items.filter(
            (item: any) => item.itemType === itemType
        )
    }

    let bankDetails: any[] = []

    if (bank_currency) {
        bankDetails = TNC_BANK_DETAILS.filter(
            (details) => details.currency === bank_currency
        )
    }

    const date = new Date()

    const experiences = getFilteredItems('EXPERIENCE')
    const merchandise = getFilteredItems('MERCHANDISE')
    const vouchers = getFilteredItems('VOUCHER')
    const events = getFilteredItems('EVENT')
    const rentals = getFilteredItems('RENTAL')

    const simplifiedExperiences: any[] =
        experiences.length > 0 &&
        experiences.map((item: any) => {
            return {
                name: item.name,
                startDate: item.date,
                sku: 'Experience',
                adults: item.adults,
                children: item.children,
                extras: item.extras,
                checkInTime: item.checkInTime,
            }
        })

    const simplifiedMerchandise: any[] =
        merchandise.length > 0 &&
        merchandise.map((item: any) => {
            return {
                name: item.name,
                type: item.type,
                sku: 'Merchandise',
                option: item.selectedOption.name,
                quantity: item.quantity,
            }
        })
    const simplifiedVouchers: any[] =
        vouchers.length > 0 &&
        vouchers.map((item: any) => {
            return {
                name: item.item.voucher.voucherType,
                couponCode: item.item.voucher.couponId[0],
                sku: 'Voucher',
                ...(item.item.voucher.voucherType === 'Cash'
                    ? {
                          cash: {
                              amount: item.item.voucher.voucherAmount.amount,
                              currency:
                                  item.item.voucher.voucherAmount.currency,
                          },
                      }
                    : item.item.voucher.voucherType === 'Experience'
                      ? {
                            experience: {
                                name: item.item.voucher.voucherExperience.item
                                    .name,
                                adults: item.item.voucher.voucherExperience.item
                                    .adults,
                                children:
                                    item.item.voucher.voucherExperience.item
                                        .children,
                                extras: item.item.voucher.voucherExperience.item.extras.map(
                                    (extra: any) => ({
                                        name: extra.name,
                                        quantity: extra.quantity,
                                    })
                                ),
                            },
                        }
                      : {}), // Empty object if voucherType doesn't match 'Cash' or 'Experience'
            }
        })
    const simplifiedEvents: any[] =
        events.length > 0 &&
        events.map((item: any) => {
            return {
                name: item.name,
                sku: 'Event',
                startDate: item.startDate,
                pax: item.info.pax,
            }
        })
    const simplifiedRentals: any[] =
        rentals.length > 0 &&
        rentals.map((item: any) => {
            return {
                name: item.name,
                sku: 'Rental',
                duration: item.options[0].duration,
                startDate: formatDate(item.startDate.toString().split('T')[0]),
                endDate: formatDate(item.endDate.toString().split('T')[0]),
                quantity: item.quantity,
            }
        })

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Receipt</title>
        <style>
        /* Reset some default styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
        }

        .container {
            max-width: 800px;
            width: 90%;
            background-color: #fff;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
            border-radius: 5px;
            padding: 20px;
        }

        .header {
            background-color: #333;
            color: #fff;
            padding: 10px 0;
            text-align: center;
        }

        h1 {
            font-size: 24px;
        }

        .order-details {
            margin-top: 20px;
        }

        h2 {
            font-size: 20px;
            margin-bottom: 10px;
        }

        .address {
            margin-bottom: 20px;
        }

        p {
            margin: 8px 0;
        }

        .order-items {
            margin-top: 20px;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
        }

        .order-item {
            padding: 10px 0;
            border-bottom: 1px solid #ddd;
        }

        .order-item-sku,
        .order-item-name,
        .order-item-quantity,
        .order-item-price,
        .order-item-date,
        .order-item-time,
        .order-item-adults,
        .order-item-children,
        .order-item-pax,
        .order-item-option,
        .order-item-duration,
        .order-item-extras,
        .order-item-enddate,
        .order-item-coupon {
            padding: 0 10px;
        }

        .order-item-sku {
            flex: 0 0 15%;
        }

        .order-total {
            margin-top: 20px;
            font-size: 18px;
            text-align: right;
        }

        strong {
            font-weight: bold;
        }
    </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Order Receipt</h1>
            </div>
            <div class="order-details">
                <h2>Order ID: ${orderDetails.orderId}</h2>
                <p><strong>Order Date:</strong> ${date}</p>
                <p><strong>Shipping Address:</strong> ${
                    orderDetails.addrLine1 +
                    ' ' +
                    orderDetails.addrLine2 +
                    ' ' +
                    orderDetails.city +
                    ' ' +
                    orderDetails.postalCode
                }</p>
            </div>
            ${
                bankDetails.length > 0
                    ? `<div class="bank-transfer-instructions">
                    <h2>Payment Instructions</h2>
                    <p>
                        To confirm your order, please make a bank transfer to the following account:
                    </p>
                    ${bankDetails.map(
                        (item) =>
                            `<div class="bank-details">
                            <p><strong>
                            ${item.currency} Account Details
                            </strong></p>
                            ${item.details.map(
                                (item: any) => `<p>${item}</p>`
                            )}                            
                        </div>`
                    )}                    
                    <p>
                        Please ensure that you include your Order ID (${
                            orderDetails.orderId
                        }) as the payment reference.
                        Once the transfer is complete, attach a copy of the bank receipt to your confirmation email.
                    </p>
                </div>`
                    : ''
            }          
            <div class="order-items">
            ${
                simplifiedExperiences.length > 0
                    ? simplifiedExperiences.map(
                          (item) =>
                              `<div class="order-item">
                    <div class="order-item-sku">Item: ${item.sku}</div>
                    <div class="order-item-name">Name: ${item.name}</div>
                    <div class="order-item-adults">Adults: ${item.adults}</div>
                    <div class="order-item-children">
                        Children: ${item.children}
                    </div>
                    <div class="order-item-date">
                        Start Date: ${item.startDate}
                    </div>
                    <div class="order-item-time">
                        Check in Time: ${item.checkInTime}
                    </div>
                    <div class="order-item-extras">Extras: ${item.extras.map(
                        (extra: any) =>
                            `<p>${extra.name}: ${extra.quantity}</p>`
                    )}</div>
                </div>`
                      )
                    : ''
            }
            ${
                simplifiedEvents.length > 0
                    ? simplifiedEvents.map(
                          (item) =>
                              `<div class="order-item">
                    <div class="order-item-sku">Item: ${item.sku}</div>
                    <div class="order-item-name">Name: ${item.name}</div>
                    <div class="order-item-date">
                        Start Date: ${item.startDate}
                    </div>
                    <div class="order-item-pax">Pax: ${item.pax}</div>
                </div>`
                      )
                    : ''
            }
            ${
                simplifiedMerchandise.length > 0
                    ? simplifiedMerchandise.map(
                          (item) =>
                              `<div class="order-item">
                    <div class="order-item-sku">Item: ${item.sku}</div>
                    <div class="order-item-name">Name: ${item.name}</div>
                    <div class="order-item-option">
                        ${item.type}: ${item.option}
                    </div>
                    <div class="order-item-quantity">Quantity: ${item.quantity}</div>
                </div>`
                      )
                    : ''
            }
            ${
                simplifiedRentals.length > 0
                    ? simplifiedRentals.map(
                          (item) =>
                              `<div class="order-item">
                    <div class="order-item-sku">Item: ${item.sku}</div>
                    <div class="order-item-name">Name: ${item.name}</div>
                    <div class="order-item-duration">
                        Duration: ${item.duration}
                    </div>
                    <div class="order-item-date">
                        Duration: ${item.startDate}
                    </div>
                    <div class="order-item-enddate">
                        Duration: ${item.endDate}
                    </div>
                    <div class="order-item-quantity">
                        Duration: ${item.quantity}
                    </div>
                </div>`
                      )
                    : ''
            }
            ${
                simplifiedVouchers.length > 0
                    ? simplifiedVouchers.map(
                          (item) =>
                              `<div class="order-item">
                    <div class="order-item-sku">Item: ${item.sku}</div>
                    <div class="order-item-name">Name: ${item.name}</div>
                    <div class="order-item-coupon">Coupon Code: ${
                        item.couponCode
                    }</div>
                    ${
                        item.name === 'Cash'
                            ? `<div class="order-item-cash">Cash Amount: ${item.cash.currency} ${item.cash.amount}</div>`
                            : ''
                    }

${
    item.name === 'Experience'
        ? `<div class="order-item-experience-name">Experience Name: ${
              item.experience.name
          }</div>
       <div class="order-item-experience-adults">Adults: ${
           item.experience.adults
       }</div>
       <div class="order-item-experience-children">Children: ${
           item.experience.children
       }</div>
       <div class="order-item-experience-extras">
           Extras: ${item.experience.extras
               .map(
                   (extra: any) =>
                       `<div class="order-item-experience-extras-item">${extra.name}: ${extra.quantity}</div>`
               )
               .join('')}
       </div>`
        : ''
}
                </div>`
                      )
                    : ''
            }
            </div>
            <div class="order-total">
                <p><strong>Total Amount:</strong> ${
                    orderDetails.currency +
                    ' ' +
                    orderDetails.totalAmount.toFixed(2)
                }</p>
                <p><strong>Amount Paid:</strong> ${
                    orderDetails.currency +
                    ' ' +
                    orderDetails.amountPaid.toFixed(2)
                }</p>
                <p><strong>Balance to be Paid:</strong> ${
                    orderDetails.currency +
                    ' ' +
                    (
                        orderDetails.totalAmount - orderDetails.amountPaid
                    ).toFixed(2)
                }</p>
            </div>
        </div>
    </body>
    </html>`
}
