import React from "react";
import getIcon from "./GetIcon";

const HourlyWeather = ({data, isLoading, isDay}) => {
  return (
    <div id="hourly" style={isLoading ? { backgroundColor: "transparent" } : isDay ? { backgroundColor: "rgb(203 213 225 / 0.2)"} : {backgroundColor: "rgb(100 116 139 / 0.2)"}} className="w-full py-3 sm:py-5 rounded-xl border-2 border-white/50 z-10">
      <ul className="list-none flex flex-row justify-start overflow-x-scroll">
        {isLoading 
          ? 
        <div className="w-full h-16 py-1 z-20"></div> 
          :
        data.map((hour, index) => (
          <li key={index} className="w-full sm:min-w-100px min-w-70px">
            <div className="flex flex-col items-center justify-between h-full">
              <div className="xs:text-base text-sm">{index === 0 ? "Now" : hour.time}</div>
              {
                  parseInt(hour.icon) > 4 && index !== 0?
                  <div className="flex flex-col items-center">
                    <div>{ getIcon(hour.icon) }</div>
                    <div className="xs:text-sm text-xs font-extrabold text-blue-300">{ hour.pop }%</div>
                  </div>
                  : 
                  <div>{ getIcon(hour.icon) }</div>
                }
              <div className="xs:text-base text-sm">{hour.temp}&deg;</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

//

export default HourlyWeather;
