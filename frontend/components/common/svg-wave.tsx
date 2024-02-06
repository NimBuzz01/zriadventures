import React from 'react'

interface Props {
    fillColor: string
}

const SVGWave = ({ fillColor = 'fill-gray-50' }: Props) => {
    return (
        <div className="absolute bottom-0 left-0 w-full">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 220"
                className={fillColor}
            >
                <path
                    fillOpacity="1"
                    d="M0,192L48,176C96,160,192,128,288,112C384,96,480,96,576,117.3C672,139,768,181,864,197.3C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
            </svg>
        </div>
    )
}

export default SVGWave
