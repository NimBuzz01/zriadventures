import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

interface Props {
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

const SearchBar = ({ value, onChange }: Props) => {
    return (
        <div className="flex w-full">
            <label htmlFor="simple-search" className="sr-only">
                Search
            </label>
            <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <AiOutlineSearch />
                </div>
                <input
                    type="text"
                    id="simple-search"
                    className="block w-full rounded-lg border-2 border-gray-400 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
                    placeholder="Enter your Search here..."
                    value={value}
                    onChange={onChange}
                    required
                />
            </div>
        </div>
    )
}

export default SearchBar
