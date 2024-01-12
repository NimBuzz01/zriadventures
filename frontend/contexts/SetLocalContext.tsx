'use client'
import React, {
    ReactNode,
    createContext,
    useContext,
    useState,
    useEffect,
} from 'react'

interface LocalContextType {
    local: boolean
    setLocal: (value: boolean) => void
    key: number
    setKey: () => void
}

const LocalContext = createContext<LocalContextType | undefined>(undefined)

interface LocalProviderProps {
    children: ReactNode
}

export const LocalProvider = ({ children }: LocalProviderProps) => {
    const [local, setLocalState] = useState<boolean>(() => {
        if (typeof localStorage !== 'undefined') {
            const localValue = localStorage.getItem('local')
            return localValue ? JSON.parse(localValue) : false
        }
        return false
    })

    const [key, setKeyState] = useState<number>(0)

    const setLocal = (value: boolean) => {
        setLocalState(value)
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('local', JSON.stringify(value))
        }
    }

    const setKey = () => {
        setKeyState((prevKey) => prevKey + 1)
    }

    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            const localValue = localStorage.getItem('local')
            if (localValue !== null) {
                const parsedValue = JSON.parse(localValue)
                if (parsedValue !== local) {
                    setLocal(parsedValue)
                }
            }
        }
    }, [local])

    return (
        <LocalContext.Provider value={{ local, setLocal, key, setKey }}>
            {children}
        </LocalContext.Provider>
    )
}

export const useLocal = () => {
    const context = useContext(LocalContext)
    if (context === undefined) {
        throw new Error('useLocal must be used within a LocalProvider')
    }
    return context
}
