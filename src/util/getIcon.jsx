import React from 'react'
import { IoIosThunderstorm, IoIosCloud, IoIosRainy, IoIosSunny, IoIosMoon, IoIosCloudyNight, IoIosSnow } from "react-icons/io";
import { IoPartlySunny } from 'react-icons/io5'
import { BsCloudsFill } from 'react-icons/bs'
import { FaCloudSunRain, FaCloudMoonRain } from 'react-icons/fa'
import { TbMist } from 'react-icons/tb'

const iconMap = new Map([
    ["01d", <IoIosSunny size={30}/>],
    ["01n", <IoIosMoon size={30} />],
    ["02d", <IoPartlySunny size={30} />],
    ["02n", <IoIosCloudyNight size={30} />],
    ["03d", <IoIosCloud size={30} />],
    ["03n", <IoIosCloud size={30} />],
    ["04d", <BsCloudsFill size={30} />],
    ["04n", <BsCloudsFill size={30} />],
    ["09d", <IoIosRainy size={30} />],
    ["09n", <IoIosRainy size={30} />],
    ["10d", <FaCloudSunRain size={30} />],
    ["10n", <FaCloudMoonRain size={30} />],
    ["11d", <IoIosThunderstorm size={30} />],
    ["11n", <IoIosThunderstorm size={30} />],
    ["13d", <IoIosSnow size={30} />],
    ["13n", <IoIosSnow size={30} />],
    ["50d", <TbMist size={30} />],
    ["50n", <TbMist size={30} />],
])


const getIcon = (code) => {
  return (
    <div>
        {iconMap.get(code)}
    </div>
  )
}

export default getIcon