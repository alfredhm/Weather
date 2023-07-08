import React, { useState } from 'react'

import { IoIosThunderstorm, IoIosCloud, IoIosRainy, IoIosSunny } from "react-icons/io";

const DailyWeather = () => {
  const days = [
    { "day": "Daily Forecast", "icon": null, "high": "High", "low": "Low" },
    { "day": "Today", "icon": <IoIosSunny size={30}/> , "high": "90°", "low": "77°" },
    { "day": "Mon", "icon": <IoIosRainy  size={30} /> , "high": "96°", "low": "79°" },
    { "day": "Tue", "icon": <IoIosCloud  size={25}/> , "high": "99°", "low": "76°" },
    { "day": "Wed", "icon": <IoIosSunny  size={30}/> , "high": "95°", "low": "79°" },
    { "day": "Thu", "icon": <IoIosSunny  size={30}/> , "high": "96°", "low": "76°" },
    { "day": "Fri", "icon": <IoIosRainy  size={30}/> , "high": "94°", "low": "83°" },
    { "day": "Sat", "icon": <IoIosThunderstorm  size={30}/> , "high": "97°", "low": "80°" },
    { "day": "Sun", "icon": <IoIosThunderstorm  size={30}/> , "high": "98°", "low": "81°" },
  ]

  return (
    <div className="backdrop-blur-lg px-4">
      <div className="flex flex-col last:border-none">
          {days.map((day, index) => (
            <div className={ index === days.length - 1 ? "flex flex-row justify-between text-lg font-bold py-3 " : "flex flex-row justify-between text-lg font-bold py-3 border-b-2 border-b-blue-300/10"}>
              <div className="flex flex-row items-center justify-between w-1/6">
                <div>{ day.day }</div>
                <div>{ day.icon }</div>
              </div>
              <div className="flex w-24 justify-between">
                <span>{ day.low }</span>
                <span>{ day.high }</span>
              </div>
            </div>
          ))}
      </div>
    </div>

  )
}

export default DailyWeather