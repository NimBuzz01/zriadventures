// ExperienceContext.ts
'use client'
import { calcOffer } from '@/lib/utils/func'
import {
    ExperienceTypes,
    ExperienceDuration,
    ExperienceExtras,
} from '@/types/experienceTypes'
import { createContext, useContext, useState, ReactNode } from 'react'

interface ExperienceContextProps {
    experiences: ExperienceTypes[]
    selectedDuration: ExperienceDuration
    adults: number
    child: number
    date: Date
    checkInTime: string
    requests: string
    extras: ExperienceExtras[]
    resetContext: () => void
    setExperiences: React.Dispatch<React.SetStateAction<ExperienceTypes[]>>
    setSelectedDuration: React.Dispatch<
        React.SetStateAction<ExperienceDuration>
    >
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
    const [experiences, setExperiences] = useState<ExperienceTypes[]>([])
    const [selectedDuration, setSelectedDuration] =
        useState<ExperienceDuration>({ type: 'Minutes', amount: 0 })
    const [adults, setAdults] = useState<number>(0)
    const [child, setChild] = useState<number>(0)

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const [date, setDate] = useState<Date>(tomorrow)
    const [checkInTime, setCheckInTime] = useState<string>('')
    const [requests, setRequests] = useState<string>('')
    const [extras, setExtras] = useState<ExperienceExtras[]>([])

    const resetContext = () => {
        setExperiences([])
        setSelectedDuration({ type: 'Minutes', amount: 0 })
        setAdults(0)
        setChild(0)
        setDate(tomorrow)
        setCheckInTime('')
        setRequests('')
        setExtras([])
    }

    const contextValue: ExperienceContextProps = {
        experiences,
        selectedDuration,
        adults,
        child,
        date,
        checkInTime,
        requests,
        extras,
        resetContext,
        setExperiences,
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

export const useExperienceContext = () => {
    const context = useContext(ExperienceContext)
    if (context === undefined) {
        throw new Error(
            'useExperienceContext must be used within an ExperienceProvider'
        )
    }
    return context
}

export const getPrices = (
    duration: ExperienceDuration,
    pax: number,
    options: any[]
) => {
    if (!duration || pax === null) {
        return null
    }

    const selectedOption = options.find(
        (option: any) =>
            option.duration.type === duration.type &&
            option.duration.amount === duration.amount
    )

    if (!selectedOption) {
        return null
    }

    let matchingPaxRate = selectedOption.paxRates[0]
    for (const rate of selectedOption.paxRates) {
        if (pax >= rate.minPax) {
            matchingPaxRate = rate
        } else {
            break
        }
    }

    const { USD, LKR } = matchingPaxRate.rates
    const childCostReduction = selectedOption.childCostReduction

    return {
        adult: { USD, LKR },
        child: {
            USD: USD - childCostReduction.USD,
            LKR: LKR - childCostReduction.LKR,
        },
    }
}

export const getExperienceTotal = (
    experience: ExperienceTypes,
    duration: ExperienceDuration,
    adults: number,
    child: number,
    extras: ExperienceExtras[]
) => {
    const pax = adults + child
    const rates = getPrices(duration, pax, experience.options)

    let total: { USD: number; LKR: number } = { USD: 0, LKR: 0 }

    if (rates) {
        total.USD = rates.adult.USD * adults + rates.child.USD * child
        total.LKR = rates.adult.LKR * adults + rates.child.LKR * child
    }

    extras.forEach((extra) => {
        total.USD += extra.cost.USD
        total.LKR += extra.cost.LKR
    })

    if (experience.offer) {
        total.LKR = calcOffer(total.LKR, experience.offer)
        total.USD = calcOffer(total.USD, experience.offer)
    }

    return total
}
