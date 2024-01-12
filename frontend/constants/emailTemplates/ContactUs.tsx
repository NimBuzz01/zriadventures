export function createContactEmail(
    fullName: string,
    contactNumber: string,
    email: string,
    message: string
) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Us Email</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                  <td style="padding: 20px;">
                      <h1>Contact Us</h1>
                      <p>You have received a message from the contact form:</p>
                      <table>
                          <tr>
                              <td><strong>Full Name:</strong></td>
                              <td>${fullName}</td>
                          </tr>
                          <tr>
                              <td><strong>Contact Number:</strong></td>
                              <td>${contactNumber}</td>
                          </tr>
                          <tr>
                              <td><strong>Email:</strong></td>
                              <td>${email}</td>
                          </tr>
                          <tr>
                              <td><strong>Message:</strong></td>
                              <td>${message}</td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
    `
}
