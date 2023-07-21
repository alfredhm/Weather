import React from 'react'
import getIcon from '../util/GetIcon';

const DailyWeather = (data) => {
  const header = {day: "Daily Forecast", icon: null, high: "High", low: "Low"}
  const daily = [header, ...data.daily]

  return (
    <div className="backdrop-blur-3xl px-4 rounded-xl w-full border-2 border-white/50">
      <div className="flex flex-col last:border-none">
          {daily.map((day, index) => (
            <div key={index} className={ index === daily.length - 1 ? "flex flex-row justify-between text-lg font-bold py-3 h-16" : "h-16 flex flex-row justify-between text-lg font-bold py-3 border-b-2 border-white/30"}>
              <div className="flex flex-row items-center justify-between lg:w-1/4 sm:w-1/3 w-2/5">
                <div className="px-2 text-xs xs:text-base">{ index === 1 ? "Today" : day.day }</div>
                {
                  parseInt(day.icon) > 4 && index !== 1 ?
                  <div className="flex flex-col items-center">
                    <div>{ getIcon(day.icon) }</div>
                    <div className="text-xs text-blue-300">{ day.pop }%</div>
                  </div>
                  : 
                  <div>{ getIcon(day.icon) }</div>
                }
              </div>
              <div className="flex w-24 md:w-1/5 justify-between">
                <span className="px-2 text-xs xs:text-base flex items-center">{ day.low }&deg;</span>
                <span className="px-2 text-xs xs:text-base flex items-center">{ day.high }&deg;</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default DailyWeather