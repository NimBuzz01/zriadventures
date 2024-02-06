import { NextResponse } from "next/server";
import { COURIER_AUTH_TOKEN } from "@/app.config";
import { CourierClient } from "@trycourier/courier";
import { TNC_BANK_DETAILS } from "@/constants/pages/TermsNConditionsConstants";
import { getSortedItems } from "@/lib/utils/refactor-items";

const courier = CourierClient({ authorizationToken: COURIER_AUTH_TOKEN });

export async function POST(request: Request) {
  try {
    // Extract data from the request body
    const {
      firstName,
      orderId,
      email,
      totalAmount,
      amountPaid,
      balance,
      payCurrency,
      bankCurrency,
      items,
      failed,
    } = await request.json();

    const sortedItems = getSortedItems(items);

    let bankDetails: any[] = [];
    let formattedInfo = "";

    if (bankCurrency) {
      bankDetails = TNC_BANK_DETAILS.filter(
        (details) => details.currency === bankCurrency
      );
      formattedInfo = bankDetails[0].details.join("\n");
    }

    if (bankCurrency) {
      const { requestId } = await courier.send({
        message: {
          to: {
            email: email,
          },
          template: "Y8DVJCRXP94H05KDTPNKHF48Z2GS",
          data: {
            firstName: firstName,
            orderId: orderId,
            totalAmount: totalAmount,
            amountPaid: amountPaid,
            balance: balance,
            payCurrency: payCurrency,
            bankCurrency: bankCurrency,
            bankDetails: formattedInfo,
            item: sortedItems,
          },
        },
      });
    } else if (failed) {
      const { requestId } = await courier.send({
        message: {
          to: {
            email: email,
          },
          template: "Q8KTCJT7QZM0A5MF3ZAV4Q142260",
          data: {
            firstName: firstName,
            orderId: orderId,
          },
        },
      });
    } else {
      const { requestId } = await courier.send({
        message: {
          to: {
            email: email,
          },
          template: "48ENXP8PZ345EVGRJ5AVWQ6BD1D5",
          data: {
            firstName: firstName,
            orderId: orderId,
            items: sortedItems,
            totalAmount: totalAmount,
            amountPaid: amountPaid,
            balance: balance,
            payCurrency: payCurrency,
          },
        },
      });
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
