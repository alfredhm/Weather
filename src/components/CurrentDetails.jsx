import React from 'react'
import { LiaTemperatureLowSolid } from 'react-icons/lia'
import { IoIosSunny } from "react-icons/io";
import { PiWindBold } from 'react-icons/pi'
import { WiHumidity } from 'react-icons/wi'
import { MdVisibility } from 'react-icons/md'

const CurrentDetails = (data) => {

  const directionKey = (deg) => {
    const directions = ['N', 'NW', 'W', 'SW', 'S', 'SE', 'E', 'NE']
    const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8;
    return directions[index]
  }

  return (
    <div className="w-full grid justify-center grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="backdrop-blur-2xl rounded-xl w-full aspect-square border-2 border-white/50">
            <div className="px-4 py-2 h-full backdrop-blur-xl flex flex-col items-left justify-start ">
                <div className="flex flex-row items-center">
                    <LiaTemperatureLowSolid size={window.innerWidth > 425 ? 30 : 20}/>
                    <p className="text-xl xs:text-xs sm:text-xl pl-1">Feels Like</p>
                </div>
                <p className="xs:text-2xl sm:text-4xl text-5xl">{Math.round(parseInt(data.data.feelsLike))}&deg;</p>
            </div>
        </div>
        <div className="backdrop-blur-2xl rounded-xl w-full aspect-square border-2 border-white/50">
            <div className="px-4 py-2 h-full backdrop-blur-xl flex flex-col items-left justify-start ">
                <div className="flex flex-row items-center">
                    <IoIosSunny size={window.innerWidth > 425 ? 30 : 20}/>
                    <p className="text-xl xs:text-xs sm:text-xl pl-1">UV Index</p>
                </div>
                <p className="xs:text-2xl sm:text-4xl text-5xl">{Math.round(parseFloat(data.data.uv))}</p>
                <p className="xs:text-2xl sm:text-4xl text-5xl">{ data.data.uv < 4 ? "Low" : data.data.uv > 6 ? "High" : "Med"}</p>
            </div> 
        </div>         
        <div className="backdrop-blur-2xl rounded-xl w-full aspect-square border-2 border-white/50">
            <div className="px-4 py-2 h-full backdrop-blur-xl flex flex-col items-left justify-start ">
                <div className="flex flex-row items-center">
                    <PiWindBold size={window.innerWidth > 425 ? 30 : 20}/>
                    <p className="text-xl xs:text-xs sm:text-xl pl-1">Wind</p>
                </div>
                <p className="xs:text-2xl sm:text-4xl text-5xl">{directionKey(parseInt(data.data.windDeg))}</p>
                <p className="xs:text-2xl sm:text-4xl text-5xl">{Math.round(parseFloat(data.data.windSpeed))} mph</p>
            </div> 
        </div>
        <div className="backdrop-blur-2xl rounded-xl w-full aspect-square border-2 border-white/50">
            <div className="px-4 py-2 h-full backdrop-blur-xl flex flex-col items-left justify-start ">
                <div className="flex flex-row items-center">
                    <WiHumidity size={window.innerWidth > 425 ? 30 : 20}/>
                    <p className="text-xl xs:text-xs sm:text-xl pl-1">Humidity</p>
                </div>
                <p className="xs:text-2xl sm:text-4xl text-5xl">{data.data.humidity}%</p>
            </div> 
        </div>
        <div className="backdrop-blur-2xl rounded-xl w-full aspect-square border-2 border-white/50">
            <div className="px-4 py-2 h-full backdrop-blur-xl flex flex-col items-left justify-start ">
                <div className="flex flex-row items-center">
                    <MdVisibility size={window.innerWidth > 425 ? 30 : 20}/>
                    <p className="text-xl xs:text-xs sm:text-xl pl-1">Visibility</p>
                </div>
                <p className="xs:text-2xl sm:text-4xl text-5xl">{Math.round(data.data.visibility * 0.000621)} mi</p>
            </div> 
        </div>
    </div>
  )
}

export default CurrentDetails