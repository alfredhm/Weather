import React from 'react'

const CurrentWeather = ( {background, data, low, high, location, isLoading} ) => {
    const min = low ? low : data.low
    const max = high ? high : data.high
    const loc = location ? location : data.location
    return (
        <div className="flex items-center justify-center w-full ">
            <div style={ isLoading ? { background: "transparent" } : { backgroundImage: `url(${background})` }} className="border-2 border-white/50 flex flex-col h-36 sm:h-40 w-full items-center justify-center bg-center bg-cover rounded-xl z-10 font-semibold sm:p-20 p-10 ">
                <div className="border-4 border-white/50 backdrop-blur-xl p-2 sm:p-3 lg:p-4 rounded-xl">
                    <div className="flex flex-row justify-center gap-2 sm:gap-3">
                        <p className="sm:base text-sm flex items-center">L:{ isLoading ? "-" : parseInt(min) }&deg;</p>
                        <p className="xl:text-5xl md:text-4xl text-3xl"> { isLoading ? "--" : parseInt(data.curr) }&deg; </p>
                        <p className="flex items-center sm:base text-sm ">H:{ isLoading ? "-" : parseInt(max)}&deg;</p>
                    </div>
                    <div className="text-center">
                        <p className={loc && loc.length > 18 ? "text-sm" : "md:text-4xl sm:text-3xl xs:text-2xl text-l pr-2 sm:pr-4" }>{ isLoading ? "-----" : loc }</p>
                    </div>
                </div>
            </div>
        </div>
      );
}

export default CurrentWeather