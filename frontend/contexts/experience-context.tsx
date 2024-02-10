'use client'
import { Duration } from '@/lib/types/common-types'
import { ExperienceExtras, ExperienceTypes } from '@/lib/types/experience-types'
import { createContext, useContext, useState, ReactNode } from 'react'

interface ExperienceContextProps {
    selectedExperiences: ExperienceTypes[]
    selectedDuration: Duration
    adults: number
    child: number
    date: Date
    checkInTime: string
    requests: string
    extras: ExperienceExtras[]
    resetContext: () => void
    setSelectedExperiences: React.Dispatch<
        React.SetStateAction<ExperienceTypes[]>
    >
    setSelectedDuration: React.Dispatch<React.SetStateAction<Duration>>
    setAdults: React.Dispatch<React.SetStateAction<number>>
    setChild: React.Dispatch<React.SetStateAction<number>>
    setDate: React.Dispatch<React.SetStateAction<Date>>
    setCheckInTime: React.Dispatch<React.SetStateAction<string>>
    setRequests: React.Dispatch<React.SetStateAction<string>>
    setExtras: React.Dispatch<React.SetStateAction<ExperienceExtras[]>>
}

const ExperienceContext = createContext<ExperienceContextProps | undefined>(
    undefined
)

interface ExperienceProviderProps {
    children: ReactNode
}

export const ExperienceProvider: React.FC<ExperienceProviderProps> = ({
    children,
}) => {
    const [selectedExperiences, setSelectedExperiences] = useState<
        ExperienceTypes[]
    >([])
    const [selectedDuration, setSelectedDuration] = useState<Duration>({
        type: 'Minutes',
        amount: 0,
    })
    const [adults, setAdults] = useState<number>(0)
    const [child, setChild] = useState<number>(0)

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const [date, setDate] = useState<Date>(tomorrow)
    const [checkInTime, setCheckInTime] = useState<string>('')
    const [requests, setRequests] = useState<string>('')
    const [extras, setExtras] = useState<ExperienceExtras[]>([])

    const resetContext = () => {
        setSelectedExperiences([])
        setSelectedDuration({ type: 'Minutes', amount: 0 })
        setAdults(0)
        setChild(0)
        setDate(tomorrow)
        setCheckInTime('')
        setRequests('')
        setExtras([])
    }

    const contextValue: ExperienceContextProps = {
        selectedExperiences,
        selectedDuration,
        adults,
        child,
        date,
        checkInTime,
        requests,
        extras,
        resetContext,
        setSelectedExperiences,
        setSelectedDuration,
        setAdults,
        setChild,
        setDate,
        setCheckInTime,
        setRequests,
        setExtras,
    }

    return (
        <ExperienceContext.Provider value={contextValue}>
            {children}
        </ExperienceContext.Provider>
    )
}

export const useExperience = () => {
    const context = useContext(ExperienceContext)
    if (context === undefined) {
        throw new Error(
            'useExperienceContext must be used within an ExperienceProvider'
        )
    }
    return context
}
