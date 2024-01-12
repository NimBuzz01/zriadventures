import React, { useState } from 'react'

interface TimePickerProps {
    value: string // Should be in format "hh:mm am/pm"
    setValue: (value: string) => void
}

const TimePicker = ({ value, setValue }: TimePickerProps) => {
    const [hours, setHours] = useState<string>('1')
    const [minutes, setMinutes] = useState<string>('00')
    const [ampm, setAMPM] = useState<string>('am')

    const handleHoursChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setHours(event.target.value)
        updateValue(event.target.value, minutes, ampm)
    }

    const handleMinutesChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setMinutes(event.target.value)
        updateValue(hours, event.target.value, ampm)
    }

    const handleAMPMChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAMPM(event.target.value)
        updateValue(hours, minutes, event.target.value)
    }

    const updateValue = (
        newHours: string,
        newMinutes: string,
        newAMPM: string
    ) => {
        setValue(`${newHours}:${newMinutes} ${newAMPM}`)
    }

    const generateHoursOptions = () => {
        const options = []
        for (let i = 0; i < 12; i++) {
            const minuteValue = i.toString().padStart(2, '0')
            options.push(
                <option key={minuteValue} value={minuteValue}>
                    {minuteValue}
                </option>
            )
        }
        return options
    }

    return (
        <div className="flex w-32 justify-center rounded-md border border-gray-300 bg-white py-[0.6rem] text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ">
            <div className="flex">
                <select
                    name="hours"
                    value={hours}
                    onChange={handleHoursChange}
                    className="appearance-none bg-transparent outline-none"
                >
                    {generateHoursOptions()}
                </select>
                <span className="mr-3">:</span>
                <select
                    name="minutes"
                    value={minutes}
                    onChange={handleMinutesChange}
                    className="mr-4 appearance-none bg-transparent outline-none"
                >
                    <option value="00" defaultChecked>
                        00
                    </option>
                    <option value="30">30</option>
                </select>
                <select
                    name="ampm"
                    value={ampm}
                    onChange={handleAMPMChange}
                    className="appearance-none bg-transparent outline-none"
                >
                    <option value="am">AM</option>
                    <option value="pm">PM</option>
                </select>
            </div>
        </div>
    )
}

export default TimePicker
