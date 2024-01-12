export function createGiftVoucherTemplate(voucher: any) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ZRI Adventures Gift Voucher</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
    
        <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <tr>
                <td style="text-align: center; padding: 20px;">
                    <img src=${voucher.item.voucher.voucherTemplate.src} alt=${voucher.item.voucher.voucherTemplate.alt} style="max-width: 150px;">
                </td>
            </tr>
            <tr>
                <td style="padding: 20px;">
                    <h1 style="font-size: 24px; color: #333333; margin: 0;">Dear ${voucher.item.info.recipientsName},</h1>
                    <p style="font-size: 16px; color: #555555;">You've received a gift voucher from ${voucher.item.info.sendersName}!</p>
                    <p style="font-size: 16px; color: #555555;">Use the code below to redeem your gift voucher:</p>
                    <p style="font-size: 24px; color: #007bff; margin: 10px 0;"><strong>${voucher.item.voucher.couponId[0]}</strong></p>
                    <p style="font-size: 16px; color: #555555;">Enjoy your adventure with ZRI Adventures!</p>
                    <img src=${voucher.item.voucher.voucherTemplate.src} alt=${voucher.item.voucher.voucherTemplate.alt} style="max-width: 100%; margin-top: 20px;">
                </td>
            </tr>
            <tr>
                <td style="text-align: center; padding: 20px;">
                    <p style="font-size: 16px; color: #777777;">For any questions or assistance, please contact us at <a href="mailto:info@zriadventures.com" style="color: #007bff; text-decoration: none;">info@zriadventures.com</a>.</p>
                </td>
            </tr>
        </table>
    
    </body>
    </html>
    `
}
