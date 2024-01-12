import React from 'react'
import Map, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MAPBOX_API_KEY } from '@/app.config'
import Link from 'next/link'
import { MdLocationOn } from 'react-icons/md'

interface Props {
    lat: number
    lng: number
    href: string
}

export default function Maps({ lat, lng, href }: Props) {
    return (
        <div className="relative">
            <Map
                reuseMaps
                mapboxAccessToken={MAPBOX_API_KEY}
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: 14,
                }}
                style={{ width: '100%', height: 400 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <Marker longitude={lng} latitude={lat} anchor="bottom" />
            </Map>
            <Link
                href={href}
                target="_blank"
                className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-green-600 p-2 text-sm font-medium text-white transition-all hover:bg-green-800"
            >
                <MdLocationOn /> View on Google Maps
            </Link>
        </div>
    )
}
