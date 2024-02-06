import { useExperience } from '@/contexts/experience-context'
import { useLocal } from '@/contexts/local-context'
import { Duration } from '@/lib/types/common-types'
import { useEffect, useState } from 'react'

interface Props {
    options: any[]
}

const PricingOptions: React.FC<Props> = ({ options }) => {
    const { selectedDuration, setSelectedDuration } = useExperience()
    const { local } = useLocal()

    useEffect(() => {
        setSelectedDuration(options[0]?.duration || null)
    }, [])

    const getSelectedPaxForDuration = (duration: Duration) => {
        const selectedOption = options.find(
            (option) =>
                option.duration.type === duration.type &&
                option.duration.amount === duration.amount
        )

        return selectedOption?.paxRates[0]?.minPax || null
    }

    const [selectedPax, setSelectedPax] = useState<number | null>(
        getSelectedPaxForDuration(options[0]?.duration) || null
    )

    const handleDurationChange = (duration: Duration) => {
        setSelectedDuration(duration)
        setSelectedPax(getSelectedPaxForDuration(duration))
    }

    const handlePaxChange = (minPax: number) => {
        setSelectedPax(minPax)
    }

    const getAdjustedPrices = () => {
        if (!selectedDuration || selectedPax === null) {
            return null
        }

        const selectedOption = options.find(
            (option) =>
                option.duration.type === selectedDuration.type &&
                option.duration.amount === selectedDuration.amount
        )

        if (!selectedOption) {
            return null
        }

        const matchingPaxRate = selectedOption.paxRates.find(
            (rate: { minPax: number }) => selectedPax <= rate.minPax
        )

        if (!matchingPaxRate) {
            return null
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

    const adjustedPrices = getAdjustedPrices()

    return (
        <div>
            {adjustedPrices && (
                <>
                    <p className="text-3xl font-semibold">
                        {local ? (
                            <>LKR {adjustedPrices.adult.LKR}</>
                        ) : (
                            <>USD ${adjustedPrices.adult.USD}</>
                        )}{' '}
                        <span className="text-sm font-medium uppercase">
                            per Adult
                        </span>
                    </p>
                    <p className="text-lg font-semibold">
                        {local ? (
                            <>LKR {adjustedPrices.child.LKR}</>
                        ) : (
                            <>USD ${adjustedPrices.child.USD}</>
                        )}{' '}
                        <span className="text-sm font-medium uppercase">
                            per Child
                        </span>
                    </p>
                </>
            )}
            <div className="mb-4 mt-5">
                <p className="mb-1 font-medium text-gray-600">
                    Available Duration
                </p>
                <div className="flex flex-wrap gap-2">
                    {options.map((option) => (
                        <label
                            key={
                                option.duration.type +
                                '-' +
                                option.duration.amount
                            }
                            className={`inline-flex items-center rounded-md border-2 px-3 py-2 text-sm font-medium uppercase ${
                                selectedDuration?.type ===
                                    option.duration.type &&
                                selectedDuration?.amount ===
                                    option.duration.amount
                                    ? 'border-gray-400 bg-gray-100 text-blue-950'
                                    : 'border-gray-300'
                            } cursor-pointer`}
                        >
                            <input
                                type="radio"
                                value={
                                    option.duration.type +
                                    '-' +
                                    option.duration.amount
                                }
                                checked={
                                    selectedDuration?.type ===
                                        option.duration.type &&
                                    selectedDuration?.amount ===
                                        option.duration.amount
                                }
                                onChange={() =>
                                    handleDurationChange(option.duration)
                                }
                                className="peer mr-2 hidden"
                            />
                            {option.duration.amount} {option.duration.type}
                        </label>
                    ))}
                </div>
            </div>
            {selectedDuration && (
                <div className="mb-4">
                    <p className="mb-1 font-medium text-gray-600">Pax Rates</p>
                    <div className="flex flex-wrap gap-2">
                        {options
                            .find(
                                (option) =>
                                    option.duration.type ===
                                        selectedDuration.type &&
                                    option.duration.amount ===
                                        selectedDuration.amount
                            )
                            ?.paxRates.map((rate: any) => (
                                <label
                                    key={rate.minPax}
                                    className={`inline-flex items-center rounded-md border-2 px-3 py-2 text-sm font-medium uppercase ${
                                        selectedPax === rate.minPax
                                            ? 'border-gray-400 bg-gray-100 text-blue-950'
                                            : 'border-gray-300'
                                    } cursor-pointer`}
                                >
                                    <input
                                        type="radio"
                                        value={rate.minPax}
                                        checked={selectedPax === rate.minPax}
                                        onChange={() =>
                                            handlePaxChange(rate.minPax)
                                        }
                                        className="peer mr-2 hidden"
                                    />
                                    {rate.minPax}
                                    {rate.maxPax !== null
                                        ? ' - ' + rate.maxPax
                                        : ' - more'}{' '}
                                    Pax
                                </label>
                            ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default PricingOptions
