'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { getExperienceData } from '@/lib/data/ExperienceData'
import { getMerchandiseData } from '@/lib/data/MerchandiseData'
import { ExperienceTypes } from '@/types/experienceTypes'
import { MerchandiseTypes } from '@/types/merchandiseTypes'
import { EventTypes } from '@/types/eventTypes'
import { getEventData } from '@/lib/data/EventData'
import { RentalTypes } from '@/types/rentalTypes'
import { getRentalsData } from '@/lib/data/RentalData'

interface DataContextType {
    experiences: ExperienceTypes[]
    merchandise: MerchandiseTypes[]
    rentals: RentalTypes[]
    events: EventTypes[]
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [experiences, setExperiences] = useState<ExperienceTypes[]>([])
    const [merchandise, setMerchandise] = useState<MerchandiseTypes[]>([])
    const [rentals, setRentals] = useState<RentalTypes[]>([])
    const [events, setEvents] = useState<EventTypes[]>([])

    useEffect(() => {
        async function fetchData() {
            try {
                const mappedExperiences = await getExperienceData()
                setExperiences(mappedExperiences)

                const mappedMerchandise = await getMerchandiseData()
                setMerchandise(mappedMerchandise)

                const mappedRentals = await getRentalsData()
                setRentals(mappedRentals)

                const mappedEvents = await getEventData()
                setEvents(mappedEvents)
            } catch (error) {
                console.error('Error fetching and mapping data:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <DataContext.Provider
            value={{ experiences, merchandise, rentals, events }}
        >
            {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => {
    const context = useContext(DataContext)
    if (context === undefined) {
        throw new Error('useDataContext must be used within a DataProvider')
    }
    return context
}

export default DataProvider
