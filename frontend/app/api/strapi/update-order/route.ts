import { NextResponse } from "next/server";
import { getOrderDetails } from "@/lib/utils/strapi-utils";
import {
  sendEmailReceipt,
  sendEmailReceiptFailed,
} from "@/lib/utils/courier-func";
import { EMAIL_SENDER_EMAIL } from "@/app.config";
import { sendEmail } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    try {
      sendEmail(EMAIL_SENDER_EMAIL, "TEST", "data");
      // if (data.orderId) {
      //     const temp = await getOrderDetails(data.orderId)
      //     const tempOrder = temp[0].attributes

      //     if (data.paymentStatus === 'SUCCESS') {
      //         sendEmailReceipt(
      //             tempOrder.firstName,
      //             tempOrder.orderId,
      //             tempOrder.email,
      //             tempOrder.totalAmount,
      //             tempOrder.amountPaid,
      //             tempOrder.currency,
      //             tempOrder.items
      //         )
      //     } else if (data.paymentStatus === 'FAILED') {
      //         sendEmailReceiptFailed(
      //             tempOrder.firstName,
      //             tempOrder.orderId
      //         )
      //     }
      // }
    } catch (error) {
      console.error("Error sending email:", error);
    }

    return NextResponse.json({
      message: "Email sent successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({
      message: "Email could not be sent",
      status: 500,
    });
  }
}
