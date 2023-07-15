import React from 'react'
import getIcon from '../util/getIcon';

const DailyWeather = (data) => {
  const header = {day: "Daily Forecast", icon: null, high: "High", low: "Low"}
  const today = {day: "Today", icon: data.current.icon, high: Math.round(parseFloat(data.current.high)), low: Math.round(parseFloat(data.current.low))}
  const daily = [header, today, ...data.daily]

  return (
    <div className="backdrop-blur-2xl px-4 rounded-xl w-full border-2 border-white/50">
      <div className="flex flex-col last:border-none">
          {daily.map((day, index) => (
            <div key={index} className={ index === daily.length - 1 ? "flex flex-row justify-between text-lg font-bold py-3 " : "flex flex-row justify-between text-lg font-bold py-3 border-b-2 border-white/30"}>
              <div className="flex flex-row items-center justify-between xl:w-1/5 lg:w-1/4 w-1/3">
                <div>{ day.day }</div>
                <div>{ getIcon(day.icon) }</div>
              </div>
              <div className="flex w-24 md:w-1/5 justify-between">
                <span>{ day.low }&deg;</span>
                <span>{ day.high }&deg;</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default DailyWeather