import React from 'react'
import getIcon from './GetIcon';

const DailyWeather = (data) => {
  const header = {day: "Daily Forecast", icon: null, high: "High", low: "Low"}
  const daily = [header, ...data.daily]

  return (
    <div style={data.isDay ? { backgroundColor: "rgb(203 213 225 / 0.2)"} : {backgroundColor: "rgb(100 116 139 / 0.2)"}} className=" z-10 px-2 xs:px-4 rounded-xl w-full border-2 border-white/50">
      <div className="w-full flex flex-col last:border-none">
          {daily.map((day, index) => (
            <div key={index} className={ index === daily.length - 1 ? "w-full flex flex-row justify-between text-lg font-bold py-1 xs:py-3 h-12 xs:h-16" : "w-full h-12 xs:h-16 flex flex-row justify-between text-lg font-bold py-1 xs:py-3 border-b-2 border-white/30"}>
              <div className={ index === 0 ? "flex flex-row items-center justify-between " :"flex flex-row items-center justify-between  sm:w-36 xs:w-28 w-20 " }>
                <div className="px-2 text-xs xs:text-base">{ index === 1 ? "Today" : day.day }</div>
                {
                  parseInt(day.icon) > 4 && index !== 1 ?
                  <div className="flex flex-col items-center">
                    <div>{ getIcon(day.icon) }</div>
                    <div className="text-xs xs:text-sm font-normal text-blue-300">{ day.pop }%</div>
                  </div>
                  : 
                  <div>{ getIcon(day.icon) }</div>
                }
              </div>
              <div className="flex justify-between 2xl:w-1/5 xl:w-1/4 lg:w-1/4 md:w-1/4 sm:w-1/3 xs:w-2/5">
                {index === 0 ?
                  (
                    <>
                      <span className="px-2 text-xs xs:text-base flex items-center">{ day.low }</span>
                      <span className="px-2 text-xs xs:text-base flex items-center">{ day.high }</span>
                    </>
                  )

                :
                  (
                    <>
                      <span className="px-2 text-xs xs:text-base flex items-center">{ day.low }&deg;</span>
                      <span className="px-2 text-xs xs:text-base flex items-center">{ day.high }&deg;</span>
                  </>
                  )

                }
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default DailyWeather