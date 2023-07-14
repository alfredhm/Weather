import React from 'react'
import { LiaTemperatureLowSolid } from 'react-icons/lia'
import { IoIosSunny } from "react-icons/io";
import { PiWindBold } from 'react-icons/pi'
import { WiHumidity } from 'react-icons/wi'
import { MdVisibility } from 'react-icons/md'

const CurrentDetails = (data) => {
    console.log(data)

  const directionKey = (deg) => {
    if (deg < 10 && deg > 350) {
        return "N"
    } else if (deg < 100 && deg > 80) {
        return "E"
    } else if (deg < 190 && deg > 170) {
        return "S"
    } else if (deg < 280 && deg > 260) {
        return "W"
    } else if (deg > 259 && deg < 350) {
        return "NW"
    } else if (deg > 10 && deg < 80) {
        return "NE"
    } else if (deg > 99 && deg < 170) {
        return "SE"
    } else {
        return "SW"
    }
  }

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3%">
        <div className="backdrop-blur-2xl rounded-xl w-full aspect-square">
            <div className="px-4 py-2 backdrop-blur-xl flex flex-col items-left justify-center ">
                <div className="flex flex-row items-center">
                    <LiaTemperatureLowSolid size={window.innerWidth > 425 ? 30 : 20}/>
                    <p className="sm:text-xl text-l pl-1">Feels Like</p>
                </div>
                <p className="sm:text-5xl text-4xl">{parseInt(data.data.feelsLike)}°</p>
            </div>
        </div>
        <div className="backdrop-blur-2xl rounded-xl w-full aspect-square">
            <div className="px-4 py-2 backdrop-blur-xl flex flex-col items-left justify-center ">
                <div className="flex flex-row items-center">
                    <IoIosSunny size={window.innerWidth > 425 ? 30 : 20}/>
                    <p className="sm:text-xl text-l pl-1">UV Index</p>
                </div>
                <p className="sm:text-5xl text-4xl">{data.data.uv}</p>
                <p className="text-3xl">{ data.data.uv < 4 ? "Low" : data.data.uv > 6 ? "High" : "Med"}</p>
            </div> 
        </div>         
        <div className="backdrop-blur-2xl rounded-xl w-full aspect-square">
            <div className="px-4 py-2 backdrop-blur-xl flex flex-col items-left justify-center ">
                <div className="flex flex-row items-center">
                    <PiWindBold size={window.innerWidth > 425 ? 30 : 20}/>
                    <p className="sm:text-xl text-l pl-1">Wind</p>
                </div>
                <p className="sm:text-5xl text-4xl">{directionKey(data.data.windDeg)}</p>
                <p className="text-3xl">{Math.round(data.data.windSpeed)}</p>
            </div> 
        </div>
        <div className="backdrop-blur-2xl rounded-xl w-full aspect-square">
            <div className="px-4 py-2 backdrop-blur-xl flex flex-col items-left justify-center ">
                <div className="flex flex-row items-center">
                    <WiHumidity size={window.innerWidth > 425 ? 30 : 20}/>
                    <p className="sm:text-xl text-l pl-1">Humidity</p>
                </div>
                <p className="sm:text-5xl text-4xl">{data.data.humidity}%</p>
            </div> 
        </div>
        <div className="backdrop-blur-2xl rounded-xl w-full aspect-square">
            <div className="px-4 py-2 backdrop-blur-xl flex flex-col items-left justify-center ">
                <div className="flex flex-row items-center">
                    <MdVisibility size={window.innerWidth > 425 ? 30 : 20}/>
                    <p className="sm:text-xl text-l pl-1">Visibility</p>
                </div>
                <p className="sm:text-5xl text-4xl">{data.data.visibility} mi</p>
            </div> 
        </div>
    </div>
  )
}

export default CurrentDetails