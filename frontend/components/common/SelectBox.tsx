'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

interface Item {
    value: string
    label: string
}

interface ComboboxDemoProps {
    items: Item[]
    value: string
    setValue: React.SetStateAction<any>
    title?: string
}

export function SelectBox({
    items,
    value,
    setValue,
    title = 'item',
}: ComboboxDemoProps) {
    const [open, setOpen] = React.useState(false)
    const sortedItems = [...items].sort((a, b) =>
        a.label.localeCompare(b.label)
    )

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? items.find((item) => item.value === value)?.label
                        : `Select ${title}...`}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder={`Search ${title}...`} />
                    <CommandEmpty>No {title} found.</CommandEmpty>
                    <ScrollArea className="h-80 rounded-md">
                        <CommandGroup>
                            {sortedItems.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={(currentValue) => {
                                        setValue(
                                            currentValue === value
                                                ? ''
                                                : currentValue
                                        )
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value === item.value
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                    {item.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </ScrollArea>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
