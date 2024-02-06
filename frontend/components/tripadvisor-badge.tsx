'use client'
import React, { useEffect } from 'react'

const TripAdvisorBadge: React.FC = () => {
    useEffect(() => {
        const script = document.createElement('script')
        script.src =
            'https://www.jscache.com/wejs?wtype=rated&amp;uniq=469&amp;locationId=16744429&amp;lang=en_US&amp;display_version=2'
        script.async = true
        script.setAttribute('data-loadtrk', 'true')
        document.getElementById('TA_rated469')?.appendChild(script)
    }, [])

    useEffect(() => {
        const script = document.createElement('script')
        script.src =
            'https://www.jscache.com/wejs?wtype=rated&amp;uniq=321&amp;locationId=16744429&amp;lang=en_US&amp;display_version=2'
        script.async = true
        script.setAttribute('data-loadtrk', 'true')
        document.getElementById('TA_rated321')?.appendChild(script)
    }, [])

    return (
        <>
            <div
                className="row d-flex justify-content-lg-start justify-content-sm-center justify-content-center mb-20"
                style={{ height: '105px', marginLeft: '-10px' }}
            >
                <div
                    id="TA_rated469"
                    className="TA_rated ml-2"
                    style={{ display: 'inline-block' }}
                >
                    <ul className="col-3">
                        <li className="">
                            <a
                                target="_blank"
                                href="https://www.tripadvisor.com/"
                            >
                                <img
                                    src="https://www.tripadvisor.com/img/cdsi/img2/badges/ollie-11424-2.gif"
                                    alt="TripAdvisor"
                                />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="TA_rated321" className="TA_rated">
                <ul id="WKNyOjin" className="TA_links anh3GeQYO">
                    <li id="OcuMNkJND" className="NlDmFH5Q">
                        <a
                            target="_blank"
                            href="https://www.tripadvisor.com/Attraction_Review-g293962-d16744429-Reviews-ZRI_Adventures-Colombo_Western_Province.html"
                        >
                            <img
                                src="https://www.tripadvisor.com/img/cdsi/img2/badges/ollie-11424-2.gif"
                                alt="TripAdvisor"
                            />
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default TripAdvisorBadge
