import { APP_BASE_URL, MINTPAY_MERCHANT_ID } from "@/app.config";
import { initiateKokoPayment } from "./koko";
import { initiateMintPayPayment } from "./mintpay";
import { initiatePayHerePayment } from "./payhere";
import { createMintpayProducts } from "../create-mintpay-items";

export async function constructOrderDetails(
  vendor: "PAYHERE" | "KOKO" | "MINTPAY",
  orderId: string,
  firstName: string,
  lastName: string,
  email: string,
  contactNumber: string,
  nationality: string,
  addrLine1: string,
  addrLine2: string,
  city: string,
  postalCode: string,
  currency: string,
  amount: number
) {
  if (vendor === "PAYHERE") {
    const orderDetails = {
      return_url: decodeURIComponent(
        `${APP_BASE_URL}/checkout?step=final&vendor=payhere&status=success&orderId=${orderId}`
      ),
      cancel_url: decodeURIComponent(
        `${APP_BASE_URL}/checkout?step=final&vendor=payhere&status=failed&orderId=${orderId}`
      ),
      notify_url: decodeURIComponent(
        `${APP_BASE_URL}/api/payment/payhere/notify`
      ),
      first_name: firstName,
      last_name: lastName,
      email: decodeURIComponent(email),
      phone: contactNumber,
      address: addrLine1 + addrLine2,
      city: city,
      country: nationality,
      order_id: orderId,
      items: "ZRI Adventures - " + orderId,
      currency: currency,
      amount: amount,
    };
    try {
      const payHereResponse = await initiatePayHerePayment(orderDetails);
      console.log(payHereResponse);
    } catch (error) {
      console.error("Error initiating PayHere payment:", error);
    }
  } else if (vendor === "KOKO") {
    const orderDetails = {
      _returnUrl: `${APP_BASE_URL}/checkout?step=final&vendor=koko&status=success&orderId=${orderId}`,
      _cancelUrl: `${APP_BASE_URL}/checkout?step=final&vendor=koko&status=failed&orderId=${orderId}`,
      _responseUrl: `${APP_BASE_URL}/api/payment/koko/notify`,
      _amount: amount.toString(),
      _currency: currency,
      _reference: orderId,
      _orderId: orderId,
      _pluginName: "customapi",
      _pluginVersion: "1.0.1",
      _description: "ZRI Adventures - " + orderId,
      _firstName: firstName,
      _lastName: lastName,
      _email: decodeURIComponent(email),
    };

    try {
      const kokoResponse = await initiateKokoPayment(orderDetails);
      console.log(kokoResponse);
    } catch (error) {
      console.error("Error initiating Koko payment:", error);
    }
  } else if (vendor === "MINTPAY") {
    const orderDetails = {
      merchant_id: MINTPAY_MERCHANT_ID,
      order_id: orderId,
      total_price: amount,
      discount: 0.0,
      customer_email: decodeURIComponent(email),
      customer_id: orderId.split("-")[1],
      customer_telephone: contactNumber,
      ip: "",
      x_forwarded_for: "",
      delivery_street: addrLine1 + addrLine2,
      delivery_region: city,
      delivery_postcode: postalCode,
      cart_created_date: new Date(),
      cart_updated_date: new Date(),
      success_url: decodeURIComponent(
        `${APP_BASE_URL}/checkout?step=final&vendor=mintpay&status=success&orderId=${orderId}`
      ),
      fail_url: decodeURIComponent(
        `${APP_BASE_URL}/checkout?step=final&vendor=mintpay&status=failed&orderId=${orderId}`
      ),
      products: createMintpayProducts(),
    };
    try {
      const mintpayResponse = await initiateMintPayPayment(orderDetails);
      console.log(mintpayResponse);
    } catch (error) {
      console.error("Error initiating MintPay payment:", error);
    }
  }
}
