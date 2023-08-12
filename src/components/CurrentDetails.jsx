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

  const size = window.innerWidth > 767 ? 30 : 20

  const skeletons = [0, 1, 2, 3, 4]

  const details = [
    { icon: <LiaTemperatureLowSolid size={size} />, header: "Feels Like", data: Math.round(parseInt(data.feelsLike)).toString() +  '°', details: null},
    { icon: <IoIosSunny size={size} />, header: "UV Index", data: Math.round(parseFloat(data.uv)).toString(), details: data.uv < 4 ? "Low" : data.uv > 6 ? "High" : "Med" },
    { icon: <PiWindBold size={size} />, header: "Wind", data: directionKey(parseInt(data.windDeg)), details: `${Math.round(parseFloat(data.windSpeed)).toString()} ${isImperial ? "mph" : "kph"}`},
    { icon: <WiHumidity size={size} />, header: "Humidity", data: data.humidity + "%", details: null },
    { icon: <MdVisibility size={size} />, header: "Visibility", data: isImperial ? Math.round(data.visibility * 0.000621).toString() : Math.round(data.visibility * 0.001).toString(), details:  isImperial ? "mi" : "km" } 
  ]

  return (
    <div className="w-full grid justify-center grid-cols-2 details:grid-cols-3 gap-4">
        { isLoading ?
            skeletons.map(skeleton => 
                <div key={skeleton} className="bg-transparent z-10 rounded-xl w-full aspect-square border-2 border-white/50"></div>  
            )
        :    
            details.map(detail => 
                <div style={isDay ? { backgroundColor: "rgb(203 213 225 / 0.2)"} : {backgroundColor: "rgb(100 116 139 / 0.2)"}} className="z-10 rounded-xl w-full aspect-square border-2 border-white/50">
                    <div className="xs:px-4 px-2 py-2 h-full flex flex-col items-left justify-start rounded-xl ">
                        <div className="flex flex-row items-center">
                            { detail.icon }
                            <p className="text-xs md:text-xl pl-1">{detail.header}</p>
                        </div>
                        <p className="text-xl xs:text-3xl">{detail.data}</p>
                        { detail.details && <p className="text-xs xs:text-xl">{detail.details}</p>}
                    </div>
                </div>   
            )
        }

    </div>
  )

}

export default CurrentDetails