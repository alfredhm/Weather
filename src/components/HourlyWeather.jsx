import React from "react";
import getIcon from "../util/GetIcon";

const HourlyWeather = (hours) => {
  return (
    <div id="hourly" className="w-full backdrop-blur-2xl py-5 rounded-xl border-2 border-white/50">
      <ul className="list-none flex flex-row justify-start overflow-x-scroll">
        {hours.data.map((hour, index) => (
          <li key={index} className="w-full sm:min-w-100px min-w-70px">
            <div className="flex flex-col items-center justify-between h-full">
              <div>{index === 0 ? "Now" : hour.time}</div>
              {
                  parseInt(hour.icon) > 4 && index !== 0?
                  <div className="flex flex-col items-center">
                    <div>{ getIcon(hour.icon) }</div>
                    <div className="text-xs text-blue-300 font-black">{ hour.pop }%</div>
                  </div>
                  : 
                  <div>{ getIcon(hour.icon) }</div>
                }
              <div>{hour.temp}&deg;</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

//

export default HourlyWeather;
