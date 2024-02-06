'use client'
import React, { useState } from 'react'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

interface Props {
    children: JSX.Element | JSX.Element[]
    dots?: boolean
    arrows?: boolean
    perView: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    xl2?: number
    spacing: number
}

const CardCarousel = ({
    children,
    dots,
    arrows,
    perView,
    sm,
    md,
    lg,
    xl,
    xl2,
    spacing,
}: Props) => {
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
        loop: false,
        mode: 'free-snap',
        breakpoints: {
            '(min-width: 640px)': {
                slides: { perView: sm, spacing: spacing },
            },
            '(min-width: 768px)': {
                slides: { perView: md, spacing: spacing },
            },
            '(min-width: 1024px)': {
                slides: { perView: lg, spacing: spacing },
            },
            '(min-width: 1280px)': {
                slides: { perView: xl, spacing: spacing },
            },
            '(min-width: 1536px)': {
                slides: { perView: xl2, spacing: spacing },
            },
        },
        slides: {
            perView: perView,
            spacing: spacing,
        },
    })

    return (
        <>
            <div className="relative w-full">
                <div ref={sliderRef} className="keen-slider">
                    {Array.isArray(children) &&
                        children.map((item: JSX.Element, index: number) => (
                            <div
                                key={index}
                                className={`keen-slider__slide number-slide${
                                    index + 1
                                }`}
                            >
                                {item}
                            </div>
                        ))}
                </div>
                {arrows && loaded && instanceRef.current && (
                    <>
                        <BsArrowLeft
                            onClick={(e: any) =>
                                e.stopPropagation() ||
                                instanceRef.current?.prev()
                            }
                            disabled={currentSlide === 0}
                            className={`absolute left-0 top-[45%] hidden h-12 w-12 -translate-x-1/2  cursor-pointer rounded-sm border-[1px] bg-white p-3 transition-all hover:border-green-600 hover:text-green-600 sm:left-1 sm:block`}
                        />

                        <BsArrowRight
                            onClick={(e: any) =>
                                e.stopPropagation() ||
                                instanceRef.current?.next()
                            }
                            disabled={
                                currentSlide ===
                                instanceRef.current.track.details.slides
                                    .length -
                                    1
                            }
                            className={`absolute left-auto right-0 top-[45%] hidden h-12 w-12 translate-x-1/2 cursor-pointer rounded-sm border-[1px] bg-white p-3 transition-all hover:border-green-600 hover:text-green-600 sm:-right-1 sm:block`}
                        />
                    </>
                )}
            </div>
            {dots && loaded && instanceRef.current && (
                <div className="flex justify-center p-3">
                    {Array.from(
                        {
                            length: instanceRef.current.track.details.slides
                                .length,
                        },
                        (_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    instanceRef.current?.moveToIdx(idx)
                                }}
                                className={
                                    'mx-1 h-2.5 w-2.5  cursor-pointer rounded-full border-0 p-1 transition-all focus:outline-none ' +
                                    (currentSlide === idx
                                        ? 'scale-150 bg-green-600'
                                        : 'bg-green-600')
                                }
                            ></button>
                        )
                    )}
                </div>
            )}
        </>
    )
}

export default CardCarousel
