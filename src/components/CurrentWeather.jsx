import React from 'react'
import { IoIosThunderstorm } from "react-icons/io";

const CurrentWeather = () => {
    const data = {
        low: 80,
        current: 86,
        high: 97,
        location: "Houston"
    }

    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col h-40 items-center justify-center bg-cover bg-center rounded-xl backdrop-blur-xl font-semibold w-fit p-20">
                <div className="flex flex-row justify-center gap-3">
                    <p className="flex items-center">L:{ data.low }°</p>
                    <p className=" md:text-5xl text-4xl">{ data.current }°</p>
                    <p className="flex items-center">H:{ data.high }°</p>
                </div>
                <div className="text-center">
                    <p className="md:text-4xl text-3xl">{ data.location }</p>
                </div>
            </div>
        </div>

      );
}

export default CurrentWeather