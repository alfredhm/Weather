import React from 'react'
import { IoIosThunderstorm, IoIosCloud, IoIosRainy, IoIosSunny, IoIosMoon, IoIosCloudyNight, IoIosSnow } from "react-icons/io";
import { IoPartlySunny } from 'react-icons/io5'
import { BsCloudsFill } from 'react-icons/bs'
import { FaCloudSunRain, FaCloudMoonRain } from 'react-icons/fa'
import { TbMist } from 'react-icons/tb'

const iconSize = window.innerWidth > 389 ? 30 : 25

const iconMap = new Map([
    ["01d", <IoIosSunny size={iconSize}/>],
    ["01n", <IoIosMoon size={iconSize} />],
    ["02d", <IoPartlySunny size={iconSize} />],
    ["02n", <IoIosCloudyNight size={iconSize} />],
    ["03d", <IoIosCloud size={iconSize} />],
    ["03n", <IoIosCloud size={iconSize} />],
    ["04d", <BsCloudsFill size={iconSize} />],
    ["04n", <BsCloudsFill size={iconSize} />],
    ["09d", <IoIosRainy size={iconSize} />],
    ["09n", <IoIosRainy size={iconSize} />],
    ["10d", <FaCloudSunRain size={iconSize} />],
    ["10n", <FaCloudMoonRain size={iconSize} />],
    ["11d", <IoIosThunderstorm size={iconSize} />],
    ["11n", <IoIosThunderstorm size={iconSize} />],
    ["13d", <IoIosSnow size={iconSize} />],
    ["13n", <IoIosSnow size={iconSize} />],
    ["50d", <TbMist size={iconSize} />],
    ["50n", <TbMist size={iconSize} />],
])

const getIcon = (code) => {
  return (
    <div>
        {iconMap.get(code)}
    </div>
  )
}

export default getIcon