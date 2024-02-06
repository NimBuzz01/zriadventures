import React from 'react'

interface Props {
    bankTransfer?: boolean
}

const OtherInfo = ({ bankTransfer }: Props) => {
    return (
        <div className="mt-10 text-gray-500">
            <h1 className="mb-6 text-lg font-medium text-gray-700">
                What Happens Next?
            </h1>
            {bankTransfer ? (
                <>
                    <p className="font-medium">Reserve your experiences</p>
                    <p className="mb-4 text-sm">
                        Select your preferred payment mode and click
                        &quot;RESERVE&quot;
                    </p>
                    <p className="font-medium">Make the payment</p>
                    <p className="mb-4 text-sm">
                        An email will be sent to your email with the reservation
                        details and Bank account details to make the payment.
                    </p>
                    <p className="font-medium">Confirm your payment</p>
                    <p className="mb-4 text-sm">
                        An email will be sent to your email with the reservation
                        details and Bank account details to make the payment.
                    </p>
                    <p className="font-medium">
                        Your reservation is confirmed! One of our team members
                        will get in touch with you soon.
                    </p>
                    <p className="mb-4 text-sm">
                        Once your payment is verified, You will receive
                        reservation confirmation via Email.
                    </p>
                </>
            ) : (
                <>
                    <p className="font-medium">Reserve your experiences</p>
                    <p className="mb-4 text-sm">
                        Select your preferred payment mode and click &quot;PAY
                        NOW&quot;
                    </p>
                    <p className="font-medium">Make the payment</p>
                    <p className="mb-4 text-sm">
                        You will be redirected to our Internet Payment Gateway
                        (IPG) and prompted to enter your card details and make
                        the payment
                    </p>
                    <p className="font-medium">
                        Your reservation is confirmed!
                    </p>
                    <p className="mb-4 text-sm">
                        Once your payment is verified, You will be redirected
                        back to our site. And you will receive reservation
                        confirmation via Email.
                    </p>
                </>
            )}
            <p className="font-medium">Merchandise</p>
            <p className="mb-4 text-sm">
                If you have purchased merchandise, we will deliver it to your
                address.
            </p>
        </div>
    )
}

export default OtherInfo
