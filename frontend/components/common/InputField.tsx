import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

interface Props {
    label: string
    name: string
    type: string
    value: string | number
    error: string
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
    className?: string
}

const InputField = ({
    label,
    name,
    type,
    value,
    error,
    onChange,
    className,
}: Props) => {
    return (
        <div className={className}>
            <Label htmlFor={name}>{label}</Label>
            <Input
                type={type}
                id={name}
                name={name}
                value={value}
                placeholder={label}
                onChange={onChange}
                className={`${error ? 'border-red-500' : 'border-gray-300'}`}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    )
}

export default InputField
