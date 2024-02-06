'use client'
import { TAWK_PROPERTY_ID, TAWK_WIDGET_ID } from '@/app.config';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import React from 'react'

const TawkTo = () => {
  return (
    <TawkMessengerReact propertyId={TAWK_PROPERTY_ID} widgetId={TAWK_WIDGET_ID} />
  )
}

export default TawkTo