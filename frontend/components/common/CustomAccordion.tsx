'use client'
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'

interface Props {
    title: string
    children: any
}

const CustomAccordion = ({ title, children }: Props) => {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg sm:text-xl">
                    {title}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base">
                    <div className="border-t border-gray-200"></div>
                    {children}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default CustomAccordion
