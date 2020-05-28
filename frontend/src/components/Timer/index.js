import React from 'react'

let seconds = 0

const Timer = () => {
    return setInterval(() => {
        return (
            <div>{++seconds}</div>
        )
    }, 1000);
}

export default Timer;