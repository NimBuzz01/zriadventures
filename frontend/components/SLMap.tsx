import React, { useState } from 'react'
import Map, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MAPBOX_API_KEY } from '@/app.config'
import { ExperienceLocation } from '@/types/experienceTypes'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { useDataContext } from '@/contexts/DataContext'
import Link from 'next/link'
import BlurImage from './common/BlurImage'

interface Props {
    markers: ExperienceLocation[]
}

export default function SLMap({ markers }: Props) {
    const [popover, setPopover] = useState(false)
    const [selectedMarker, setSelectedMarker] = useState<ExperienceLocation>()

    const { experiences } = useDataContext()

    return (
        <Map
            reuseMaps
            mapboxAccessToken={MAPBOX_API_KEY}
            initialViewState={{
                longitude: 80.7718,
                latitude: 7.8731,
                zoom: 7.4,
            }}
            style={{ width: '100%', height: '70dvh', maxWidth: '800px' }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    longitude={marker.coordinates.longitude}
                    latitude={marker.coordinates.latitude}
                    anchor="bottom"
                    color="red"
                    onClick={() => {
                        setPopover(true)
                        setSelectedMarker(marker)
                    }}
                    style={{ cursor: 'pointer' }}
                />
            ))}
            {popover && selectedMarker && (
                <Dialog open={popover} onOpenChange={setPopover}>
                    <DialogContent className="max-h-[90dvh] max-w-[1200px] overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-800">
                        <DialogHeader>
                            <DialogTitle>{selectedMarker.name}</DialogTitle>
                            <DialogDescription>
                                Available experiences in {selectedMarker.name}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex w-full flex-wrap">
                            {experiences
                                .filter(
                                    (exp) =>
                                        exp.location.id === selectedMarker.id
                                )
                                .map((exp) => (
                                    <Link
                                        key={exp.id}
                                        href={`/experiences/${exp.id}`}
                                        className="flex w-full items-center gap-2 rounded-md p-2 transition-all hover:bg-gray-200 md:w-1/3"
                                    >
                                        <div className="relative h-10 w-10">
                                            <BlurImage
                                                src={exp.images[0].src}
                                                alt={exp.images[0].alt}
                                                style="rounded-full"
                                            />
                                        </div>{' '}
                                        {exp.name}
                                    </Link>
                                ))}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </Map>
    )
}
