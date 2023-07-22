import React from 'react'
import { IoIosThunderstorm, IoIosCloud, IoIosRainy, IoIosSunny, IoIosMoon, IoIosCloudyNight, IoIosSnow } from "react-icons/io";
import { IoPartlySunny } from 'react-icons/io5'
import { BsCloudsFill } from 'react-icons/bs'
import { FaCloudSunRain, FaCloudMoonRain } from 'react-icons/fa'
import { TbMist } from 'react-icons/tb'

const iconMap = new Map([
    ["01d", <IoIosSunny size={ window.innerWidth > 389 ? 30 : 25 }/>],
    ["01n", <IoIosMoon size={ window.innerWidth > 389 ? 30 : 25 } />],
    ["02d", <IoPartlySunny size={ window.innerWidth > 389 ? 30 : 25 } />],
    ["02n", <IoIosCloudyNight size={ window.innerWidth > 389 ? 30 : 25 } />],
    ["03d", <IoIosCloud size={ window.innerWidth > 389 ? 30 : 25 } />],
    ["03n", <IoIosCloud size={ window.innerWidth > 389 ? 30 : 25 } />],
    ["04d", <BsCloudsFill size={ window.innerWidth > 389 ? 30 : 25 } />],
    ["04n", <BsCloudsFill size={ window.innerWidth > 389 ? 30 : 25 } />],
    ["09d", <IoIosRainy size={ window.innerWidth > 389 ? 30 : 25 } />],
    ["09n", <IoIosRainy size={ window.innerWidth > 389 ? 30 : 25 } />],
    ["10d", <FaCloudSunRain size={ window.innerWidth > 389 ? 30 : 25 } />],
    ["10n", <FaCloudMoonRain size={ window.innerWidth > 389 ? 30 : 25 } />],
    ["11d", <IoIosThunderstorm size={ window.innerWidth > 389 ? 30 : 25 } />],
    ["11n", <IoIosThunderstorm size={ window.innerWidth > 389 ? 30 : 25 } />],
    ["13d", <IoIosSnow size={ window.innerWidth > 389 ? 30 : 25 } />],
    ["13n", <IoIosSnow size={ window.innerWidth > 389 ? 30 : 25 } />],
    ["50d", <TbMist size={ window.innerWidth > 389 ? 30 : 25 } />],
    ["50n", <TbMist size={ window.innerWidth > 389 ? 30 : 25 } />],
])

const getIcon = (code) => {
  return (
    <div>
        {iconMap.get(code)}
    </div>
  )
}

export default getIcon