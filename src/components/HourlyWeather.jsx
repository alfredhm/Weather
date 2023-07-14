import React from "react";

import {
  IoIosThunderstorm,
  IoIosCloud,
  IoIosRainy,
  IoIosSunny,
} from "react-icons/io";

const HourlyWeather = () => {
  const hours = [
    ["Now", <IoIosThunderstorm color={"white"} size={30} />, "96°"],
    ["2pm", <IoIosThunderstorm color={"white"} size={30} />, "98°"],
    ["3pm", <IoIosCloud color={"white"} size={25} />, "99°"],
    ["4pm", <IoIosRainy color={"white"} size={30} />, "96°"],
    ["5pm", <IoIosThunderstorm color={"white"} size={30} />, "95°"],
    ["6pm", <IoIosSunny color={"white"} size={30} />, "95°"],
    ["7pm", <IoIosCloud color={"white"} size={25} />, "92°"],
    ["8pm", <IoIosRainy color={"white"} size={30} />, "90°"],
  ];

  return (
    <div className="w-full backdrop-blur-2xl py-5 rounded-xl">
      <ul className="list-none flex flex-row justify-start overflow-x-scroll no-scroll:overflow-hidden">
        {hours.map((hour) => (
          <li key={hour[0]} className="w-full sm:min-w-100px min-w-70px">
            <div className="flex flex-col items-center justify-center">
              <div>{hour[0]}</div>
              <div>{hour[1]}</div>
              <div>{hour[2]}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

//

export default HourlyWeather;
