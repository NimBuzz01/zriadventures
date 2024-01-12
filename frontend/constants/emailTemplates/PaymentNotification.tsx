import { getOrderDetails } from '@/lib/utils/api'
import { getSortedItems } from '@/lib/utils/filter-items'

export async function createPayhereNotifyEmail(
    orderId: string,
    provider: 'PAYHERE' | 'BANK' | 'KOKO' | 'MINTPAY',
    currency: string,
    amount: string,
    status: 'SUCCESS' | 'FAILED' | 'PENDING'
) {
    const order = await getOrderDetails(orderId)
    const orderData = order[0].attributes
    const items = await getItems(order)

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Notify Email</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                  <td style="padding: 20px;">
                      <h1>Payment Notify</h1>
                      <p>You have received a payment:</p>
                      <table>
                          <tr>
                              <td><strong>Order Id:</strong></td>
                              <td>${orderId}</td>
                          </tr>
                          <tr>
                              <td><strong>Payment Amount:</strong></td>
                              <td>${amount}</td>
                          </tr>
                          <tr>
                              <td><strong>Payment Currency:</strong></td>
                              <td>${currency}</td>
                          </tr>
                          <tr>
                              <td><strong>Payment Provider:</strong></td>
                              <td>${provider}</td>
                          </tr>
                          <tr>
                              <td><strong>Payment Status:</strong></td>
                              <td>${status}</td>
                          </tr>
                          <tr>
                              <td><strong>Full Name:</strong></td>
                              <td>${
                                  orderData.firstName + ' ' + orderData.lastName
                              }</td>
                          </tr>
                          <tr>
                              <td><strong>Contact Number:</strong></td>
                              <td>${orderData.contactNumber}</td>
                          </tr>
                          <tr>
                              <td><strong>Nationality:</strong></td>
                              <td>${orderData.nationality}</td>
                          </tr>
                          <tr>
                              <td><strong>Email:</strong></td>
                              <td>${orderData.email}</td>
                          </tr>
                          <tr>
                              <td><strong>Items:</strong></td>
                          </tr>
                          ${items.map(
                              (item: any) =>
                                  `
                                <tr>
                                    <td>${item.name}</td>
                                    </tr>
                                    <tr>
                                    <td>${item.sku}</td>
                                    </tr>
                                    ${item.content.map(
                                        (item: any) =>
                                            `<tr>
                                            <td>${item}</td>
                                            </tr>
                                        `
                                    )}
                            `
                          )}
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
    `
}

export async function createKokoNotifyEmail(
    orderId: string,
    provider: 'PAYHERE' | 'BANK' | 'KOKO' | 'MINTPAY',
    status: 'SUCCESS' | 'FAILED' | 'PENDING',
    trnsId: string
) {
    const order = await getOrderDetails(orderId)
    const orderData = order[0].attributes
    const items = await getItems(order)

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Notify Email</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                  <td style="padding: 20px;">
                      <h1>Payment Notify</h1>
                      <p>You have received a payment:</p>
                      <table>
                          <tr>
                              <td><strong>Order Id:</strong></td>
                              <td>${orderId}</td>
                          </tr>
                          <tr>
                              <td><strong>Transaction Id:</strong></td>
                              <td>${trnsId}</td>
                          </tr>
                          <tr>
                              <td><strong>Payment Provider:</strong></td>
                              <td>${provider}</td>
                          </tr>
                          <tr>
                              <td><strong>Payment Status:</strong></td>
                              <td>${status}</td>
                          </tr>
                          <tr>
                              <td><strong>Full Name:</strong></td>
                              <td>${
                                  orderData.firstName + ' ' + orderData.lastName
                              }</td>
                          </tr>
                          <tr>
                              <td><strong>Contact Number:</strong></td>
                              <td>${orderData.contactNumber}</td>
                          </tr>
                          <tr>
                              <td><strong>Nationality:</strong></td>
                              <td>${orderData.nationality}</td>
                          </tr>
                          <tr>
                              <td><strong>Email:</strong></td>
                              <td>${orderData.email}</td>
                          </tr>
                          <tr>
                              <td><strong>Items:</strong></td>
                          </tr>
                        ${items.map(
                            (item: any) =>
                                `
                                <tr>
                                    <td>${item.name}</td>
                                    </tr>
                                    <tr>
                                    <td>${item.sku}</td>
                                    </tr>
                                    ${item.content.map(
                                        (item: any) =>
                                            `<tr>
                                            <td>${item}</td>
                                            </tr>
                                        `
                                    )}
                            `
                        )}
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
    `
}

export async function createMintpayNotifyEmail(
    provider: 'PAYHERE' | 'BANK' | 'KOKO' | 'MINTPAY',
    status: 'SUCCESS' | 'FAILED' | 'PENDING',
    data: any
) {
    const order = await getOrderDetails(data.data.order_id)
    const orderData = order[0].attributes
    const items = await getItems(order)
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Notify Email</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                  <td style="padding: 20px;">
                      <h1>Payment Notify</h1>
                      <p>You have received a payment:</p>
                      <table>
                          <tr>
                              <td><strong>Order Id:</strong></td>
                              <td>${data.data.order_id}</td>
                          </tr>
                          <tr>
                              <td><strong>Total Amount:</strong></td>
                              <td>${data.data.total_price}</td>
                          </tr>
                          <tr>
                              <td><strong>Payment Provider:</strong></td>
                              <td>${provider}</td>
                          </tr>
                          <tr>
                              <td><strong>Payment Status:</strong></td>
                              <td>${status}</td>
                          </tr>
                          <tr>
                              <td><strong>Full Name:</strong></td>
                              <td>${
                                  orderData.firstName + ' ' + orderData.lastName
                              }</td>
                          </tr>
                          <tr>
                              <td><strong>Contact Number:</strong></td>
                              <td>${orderData.contactNumber}</td>
                          </tr>
                          <tr>
                              <td><strong>Nationality:</strong></td>
                              <td>${orderData.nationality}</td>
                          </tr>
                          <tr>
                              <td><strong>Email:</strong></td>
                              <td>${orderData.email}</td>
                          </tr>
                          <tr>
                              <td><strong>Items:</strong></td>
                          </tr>
                          ${items.map(
                              (item: any) =>
                                  `
                                <tr>
                                    <td>${item.name}</td>
                                    </tr>
                                    <tr>
                                    <td>${item.sku}</td>
                                    </tr>
                                    ${item.content.map(
                                        (item: any) =>
                                            `<tr>
                                            <td>${item}</td>
                                            </tr>
                                        `
                                    )}
                            `
                          )}
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
    `
}

export async function createBankNotifyEmail(
    orderId: string,
    provider: 'PAYHERE' | 'BANK' | 'KOKO' | 'MINTPAY',
    status: 'SUCCESS' | 'FAILED' | 'PENDING',
    amount: number,
    totalAmount: number,
    currency: 'LKR' | 'USD'
) {
    const order = await getOrderDetails(orderId)
    const orderData = order[0].attributes
    const items = await getItems(order)

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Notify Email</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                  <td style="padding: 20px;">
                      <h1>Payment Notify</h1>
                      <p>You have received a payment:</p>
                      <table>
                          <tr>
                              <td><strong>Order Id:</strong></td>
                              <td>${orderId}</td>
                          </tr>
                          <tr>
                              <td><strong>Payment Provider:</strong></td>
                              <td>${provider}</td>
                          </tr>
                          <tr>
                              <td><strong>Payment Amount:</strong></td>
                              <td>${amount}</td>
                          </tr>
                          <tr>
                              <td><strong>Payment Total:</strong></td>
                              <td>${totalAmount}</td>
                          </tr>
                          <tr>
                              <td><strong>Currency:</strong></td>
                              <td>${currency}</td>
                          </tr>
                          <tr>
                              <td><strong>Payment Status:</strong></td>
                              <td>${status}</td>
                          </tr>
                          <tr>
                              <td><strong>Full Name:</strong></td>
                              <td>${
                                  orderData.firstName + ' ' + orderData.lastName
                              }</td>
                          </tr>
                          <tr>
                              <td><strong>Contact Number:</strong></td>
                              <td>${orderData.contactNumber}</td>
                          </tr>
                          <tr>
                              <td><strong>Nationality:</strong></td>
                              <td>${orderData.nationality}</td>
                          </tr>
                          <tr>
                              <td><strong>Email:</strong></td>
                              <td>${orderData.email}</td>
                          </tr>
                          <tr>
                              <td><strong>Items:</strong></td>
                          </tr>
                          ${items.map(
                              (item: any) =>
                                  `
                                <tr>
                                    <td>${item.name}</td>
                                    </tr>
                                    <tr>
                                    <td>${item.sku}</td>
                                    </tr>
                                    ${item.content.map(
                                        (item: any) =>
                                            `<tr>
                                            <td>${item}</td>
                                            </tr>
                                        `
                                    )}
                            `
                          )}
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
    `
}

const getItems = async (order: any) => {
    const items = order[0].attributes.items
    const sortedItems = getSortedItems(items)
    return sortedItems
}
