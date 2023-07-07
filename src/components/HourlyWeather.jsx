import React from 'react'

import { IoIosThunderstorm, IoIosCloud, IoIosRainy, IoIosSunny } from "react-icons/io";

const HourlyWeather = () => {
    const hours = [
        ["Now", <IoIosThunderstorm color={"white"} size={30}/>, "96°"],
        ["2pm", <IoIosThunderstorm color={"white"} size={30} />, "98°"],
        ["3pm", <IoIosCloud color={"white"}  size={25} />, "99°"],
        ["4pm", <IoIosRainy color={"white"}  size={30} />, "96°"],
        ["5pm", <IoIosThunderstorm color={"white"}  size={30} />, "95°"],
        ["6pm", <IoIosThunderstorm color={"white"}  size={30} />, "95°"],
        ["7pm", <IoIosCloud color={"white"}  size={25} />, "92°"],
        ["8pm", <IoIosRainy color={"white"}  size={30} />, "90°"]
    ]
  return (
        <div className='backdrop-blur-xl py-5 rounded-xl'>
        <ul className="list-none flex flex-row justify-around">
            {hours.map((hour) => (
                <li key={hour[0]}>
                    <div className="flex flex-col items-center justify-center">
                        <div>{hour[0]}</div>
                        <div>{hour[1]}</div>
                        <div>{hour[2]}</div>
                    </div>
                </li>
            ))}
        </ul>
        </div>
  )
}

// 

export default HourlyWeather