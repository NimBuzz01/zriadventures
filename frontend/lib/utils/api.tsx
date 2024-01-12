import { STRAPI_API_KEY, STRAPI_BASE_URL } from '@/app.config'
import axios, { AxiosRequestConfig } from 'axios'
import { incrementOrderId } from './func'

const baseURL = STRAPI_BASE_URL
const apiKey = STRAPI_API_KEY

const api = axios.create({
    baseURL: `${baseURL}/api`,
    headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
    },
})

export async function fetchAPI<T>(
    path: string,
    options: AxiosRequestConfig = {}
): Promise<T> {
    try {
        const response = await api.get<T>(path, {
            ...options,
            params: {
                populate: 'deep',
                'pagination[pageSize]': 200,
                ...options.params,
            },
        })
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function postOrder<T>(data: any): Promise<T> {
    try {
        const response = await api.post<T>('/orders', data)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function postVoucher<T>(data: any): Promise<T> {
    try {
        const response = await api.post<T>('/vouchers', data)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function generateOrderId(): Promise<string> {
    try {
        const response = await api.get<{
            data: { attributes: { orderId: string } }[]
        }>('/orders', {
            params: {
                'fields[0]': 'orderId',
            },
        })

        const orders = response.data.data || []
        const latestOrderId = orders.reduce((maxOrderId, order) => {
            const orderId = order.attributes.orderId
            return orderId > maxOrderId ? orderId : maxOrderId
        }, 'zri-00000099')

        // Use your incrementOrderId function here
        const nextOrderId = incrementOrderId(latestOrderId)

        return nextOrderId
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function setPaymentStatus(
    orderId: string,
    status: 'PENDING' | 'SUCCESS' | 'FAILED'
): Promise<void> {
    try {
        // Fetch the order by orderId
        const order = await getOrderDetails(orderId)

        if (order) {
            // Update the payment status
            await updatePaymentStatus(order[0].id, status)
            console.log('Payment status updated successfully.')
        } else {
            console.error('Order not found with orderId:', orderId)
        }
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}

export async function getOrderDetails(orderId: string): Promise<any> {
    const apiUrl = `${baseURL}/api/orders?filters[orderId][$eq]=${orderId}`
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        })
        const order = response.data.data

        if (order) {
            return order
        } else {
            console.error('Order not found with orderId:', orderId)
            return null
        }
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}

export async function validateVoucherId(couponCode: string, local: boolean) {
    const apiUrl = `https://zri-adventures-test.up.railway.app/api/vouchers?filters[couponCode][$eq]=${couponCode}&populate=deep`

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        })
        const data = response.data

        if (data.data.length <= 0) {
            return 'Invalid Coupon Code'
        }

        const { attributes } = data.data[0]

        if (attributes.type !== 'CASH') {
            return 'Coupon not claimable'
        }

        if (attributes.status === 'CLAIMED') {
            return 'Coupon already claimed'
        }

        if (attributes.status === 'EXPIRED') {
            return 'Coupon expired'
        }

        if (attributes.status === 'UNPAID') {
            return 'Coupon payment not completed'
        }

        if (attributes.expiryDate <= new Date()) {
            return 'Coupon Expired'
        }

        if (
            (local && attributes.cash.currency === 'USD') ||
            (!local && attributes.cash.currency === 'LKR')
        ) {
            return 'Invalid Coupon'
        }

        const coupon = {
            id: data.data[0].id,
            amount: attributes.cash.amount,
            currency: attributes.cash.currency,
        }

        localStorage.setItem('Coupon', JSON.stringify(coupon))
        return 'Valid'
    } catch (error) {
        return 'Invalid Coupon'
    }
}

export const setCouponStatus = async (
    id: number,
    status: 'CLAIMED' | 'EXPIRED' | 'AVAILABLE'
) => {
    const apiUrl = `https://zri-adventures-test.up.railway.app/api/vouchers/${id}`

    try {
        // Send a PUT request to update the payment status
        await axios.put(
            apiUrl,
            {
                data: {
                    status: status,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        )
    } catch (error) {
        console.error('Error updating payment status:', error)
        throw error
    }
}

export async function updatePaymentStatus(
    orderId: string,
    status: 'PENDING' | 'SUCCESS' | 'FAILED'
): Promise<void> {
    const updateUrl = `${baseURL}/api/orders/${orderId}`

    try {
        // Send a PUT request to update the payment status
        await axios.put(
            updateUrl,
            {
                data: {
                    paymentStatus: status,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        )
    } catch (error) {
        console.error('Error updating payment status:', error)
        throw error
    }
}

export async function getBanners() {
    return fetchAPI('/banners')
}

export async function getVoucherTemplates() {
    return fetchAPI('/voucher-templates')
}

export async function getExperiences() {
    return fetchAPI('/experiences')
}

export async function getExperienceLocations() {
    return fetchAPI('/locations')
}

export async function getBundles() {
    return fetchAPI('/experience-bundles')
}

export async function getEvents() {
    return fetchAPI('/events')
}

export async function getExperienceCategories() {
    return fetchAPI('/experience-categories')
}

export async function getMerchandise() {
    return fetchAPI('/merchandises')
}

export async function getMerchandiseCategories() {
    return fetchAPI('/merchandise-categories')
}

export async function getRentals() {
    return fetchAPI('/rentals')
}
