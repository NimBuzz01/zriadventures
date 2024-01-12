import { RentalTypes } from '@/types/rentalTypes'

export function createRentalInquiry(data: any, rental: RentalTypes) {
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
                      <p>You have received an inquiry from Rentals:</p>
                      <table>
                        <tr>
                              <td><strong>Rental Name:</strong></td>
                              <td>${rental.name}</td>
                          </tr>
                          <tr>
                              <td><strong>Full Name:</strong></td>
                              <td>${data.firstName} ${data.lastName}</td>
                          </tr>
                          <tr>
                              <td><strong>Full Name:</strong></td>
                              <td>${data.firstName} ${data.lastName}</td>
                          </tr>
                          <tr>
                              <td><strong>Contact Number:</strong></td>
                              <td>${data.contactNumber}</td>
                          </tr>
                          <tr>
                              <td><strong>Email:</strong></td>
                              <td>${data.email}</td>
                          </tr>
                          <tr>
                              <td><strong>Message:</strong></td>
                              <td>${data.message}</td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
    `
}
