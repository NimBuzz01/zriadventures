'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

interface DatePickerProps {
    value?: Date
    setValue: (value: Date) => void
}

const DatePicker = ({ value, setValue }: DatePickerProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-[280px] justify-start text-left font-normal',
                        !value && 'text-muted-foreground'
                    )}
                >
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {value ? format(value, 'PPP') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={(value) => {
                        if (value) {
                            const midday = new Date(value)
                            midday.setHours(12)
                            setValue(midday)
                        }
                    }}
                    disabled={(date) => {
                        const currentDate = new Date()
                        const oneDayBeforeCurrentDate = new Date(currentDate)
                        oneDayBeforeCurrentDate.setDate(
                            currentDate.getDate() - 1
                        )

                        return date < oneDayBeforeCurrentDate
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

export default DatePicker
