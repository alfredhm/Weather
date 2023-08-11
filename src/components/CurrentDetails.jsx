import React from 'react'
import { LiaTemperatureLowSolid } from 'react-icons/lia'
import { IoIosSunny } from "react-icons/io";
import { PiWindBold } from 'react-icons/pi'
import { WiHumidity } from 'react-icons/wi'
import { MdVisibility } from 'react-icons/md'

const CurrentDetails = ({isImperial, isDay, data, isLoading}) => {

  const directionKey = (deg) => {
    const directions = ['N', 'NW', 'W', 'SW', 'S', 'SE', 'E', 'NE']
    const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8;
    return directions[index]
  }

  return (
    <div className="w-full grid justify-center grid-cols-2 details:grid-cols-3 gap-4">
        <div style={isDay ? { backgroundColor: "rgb(203 213 225 / 0.2)"} : {backgroundColor: "rgb(100 116 139 / 0.2)"}} className="z-10 rounded-xl w-full aspect-square border-2 border-white/50">
            <div className="xs:px-4 px-2 py-2 h-full flex flex-col items-left justify-start rounded-xl ">
                <div className="flex flex-row items-center">
                    <LiaTemperatureLowSolid size={window.innerWidth > 767 ? 30 : 20}/>
                    <p className="text-xs md:text-xl pl-1">Feels Like</p>
                </div>
                <p className="text-xl xs:text-3xl">{toString(Math.round(parseInt(data.feelsLike)))}&deg;</p>
            </div>
        </div>
        <div style={isDay ? { backgroundColor: "rgb(203 213 225 / 0.2)"} : {backgroundColor: "rgb(100 116 139 / 0.2)"}}  className="bg-slate-300/20 z-10 rounded-xl w-full aspect-square border-2 border-white/50">
            <div className="xs:px-4 px-2 py-2 h-full flex flex-col items-left justify-start rounded-xl ">
                <div className="flex flex-row items-center">
                    <IoIosSunny size={window.innerWidth > 767 ? 30 : 20}/>
                    <p className="text-xs md:text-xl pl-1">UV Index</p>
                </div>
                <p className="text-xl xs:text-3xl">{toString(Math.round(parseFloat(data.uv)))}</p>
                <p className="text-xs xs:text-xl">{ data.uv < 4 ? "Low" : data.uv > 6 ? "High" : "Med"}</p>
            </div> 
        </div>         
        <div style={isDay ? { backgroundColor: "rgb(203 213 225 / 0.2)"} : {backgroundColor: "rgb(100 116 139 / 0.2)"}}  className="bg-slate-300/20 z-10 rounded-xl w-full aspect-square border-2 border-white/50">
            <div className="xs:px-4 px-2 py-2 h-full flex flex-col items-left justify-start rounded-xl ">
                <div className="flex flex-row items-center">
                    <PiWindBold size={window.innerWidth > 767 ? 30 : 20}/>
                    <p className="text-xs md:text-xl pl-1">Wind</p>
                </div>
                <p className="text-xl xs:text-3xl">{directionKey(parseInt(data.windDeg))}</p>
                <p className="text-xs xs:text-xl font-light ">{toString(Math.round(parseFloat(data.windSpeed)))} {isImperial ? "mph" : "kph"}</p>
            </div> 
        </div>
        <div style={isDay ? { backgroundColor: "rgb(203 213 225 / 0.2)"} : {backgroundColor: "rgb(100 116 139 / 0.2)"}}  className="bg-slate-300/20 z-10 rounded-xl w-full aspect-square border-2 border-white/50">
            <div className="xs:px-4 px-2 py-2 h-full flex flex-col items-left justify-start rounded-xl ">
                <div className="flex flex-row items-center">
                    <WiHumidity size={window.innerWidth > 767 ? 30 : 20}/>
                    <p className="text-xs md:text-xl pl-1">Humidity</p>
                </div>
                <p className="text-xl xs:text-3xl">{data.humidity}%</p>
            </div> 
        </div>
        <div style={isDay ? { backgroundColor: "rgb(203 213 225 / 0.2)"} : {backgroundColor: "rgb(100 116 139 / 0.2)"}}  className="bg-slate-300/20 z-10 rounded-xl w-full aspect-square border-2 border-white/50">
            <div className="xs:px-4 px-2 py-2 h-full flex flex-col items-left justify-start rounded-xl ">
                <div className="flex flex-row items-center">
                    <MdVisibility size={window.innerWidth > 767 ? 30 : 20}/>
                    <p className="text-xs md:text-xl pl-1">Visibility</p>
                </div>
                <div className="flex flex-row md:gap-2 gap-1 items-end">
                    <p className="text-xl xs:text-3xl">{isImperial ? toString(Math.round(data.visibility * 0.000621)) : toString(Math.round(data.visibility * 0.001))}</p>
                    <p className="text-xs xs:text-xl font-light ">{isImperial ? "mi" : "km"}</p>
                </div>
            </div> 
        </div>
    </div>
  )
}

export default CurrentDetails