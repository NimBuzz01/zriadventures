'use client'
import React, { MutableRefObject } from 'react'
// import './styles.css'
import {
    useKeenSlider,
    KeenSliderPlugin,
    KeenSliderInstance,
} from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

function ThumbnailPlugin(
    mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
    return (slider) => {
        function removeActive() {
            slider.slides.forEach((slide) => {
                slide.classList.remove('active')
            })
        }
        function addActive(idx: number) {
            slider.slides[idx].classList.add('active')
        }

        function addClickEvents() {
            slider.slides.forEach((slide, idx) => {
                slide.addEventListener('click', () => {
                    if (mainRef.current) mainRef.current.moveToIdx(idx)
                })
            })
        }

        slider.on('created', () => {
            if (!mainRef.current) return
            addActive(slider.track.details.rel)
            addClickEvents()
            mainRef.current.on('animationStarted', (main) => {
                removeActive()
                const next = main.animator.targetIdx || 0
                addActive(main.track.absToRel(next))
                slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
            })
        })
    }
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

const ThumbnailCarousel = ({ children }: Props) => {
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
    })
    const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            slides: {
                perView: 4,
                spacing: 10,
            },
        },
        [ThumbnailPlugin(instanceRef)]
    )

    return (
        <>
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

            <div ref={thumbnailRef} className="keen-slider thumbnail">
                {Array.isArray(children) &&
                    children.map((item: JSX.Element, index: number) => (
                        <div
                            key={index}
                            className={`keen-slider__slide number-slide${
                                index + 1
                            } mt-2 max-h-44 cursor-pointer`}
                        >
                            {item}
                        </div>
                    ))}
            </div>
        </>
    )
}

export default ThumbnailCarousel
