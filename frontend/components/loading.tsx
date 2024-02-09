import React from 'react'
import NotFoundLabel from './notfound-label'

const Loading = () => {
    return (
        <div className="h-screen w-full">
            <NotFoundLabel text="Loading..." loading />
        </div>
    )
}

export default Loading
