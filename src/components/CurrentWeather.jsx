import React from 'react'

const CurrentWeather = ( props ) => {
    return (
        <div className="flex items-center justify-center w-full ">
            <div style={props.background === "transparent" ? { background: "transparent" } : { backgroundImage: `url(${props.background})` }} className="border-2 border-white/50 flex flex-col h-36 sm:h-40 w-full items-center justify-center bg-center bg-cover rounded-xl z-10 font-semibold sm:p-20 p-10 ">
                <div className="border-4 border-white/50 backdrop-blur-xl p-2 sm:p-3 lg:p-4 rounded-xl">
                    <div className="flex flex-row justify-center gap-2 sm:gap-3">
                        <p className="sm:base text-sm flex items-center">L:{ parseInt(props.data.low) }&deg;</p>
                        <p className="xl:text-5xl md:text-4xl text-3xl"> { parseInt(props.data.curr) }&deg; </p>
                        <p className="flex items-center sm:base text-sm ">H:{ parseInt(props.data.high)}&deg;</p>
                    </div>
                    <div className="text-center">
                        <p className=" md:text-4xl sm:text-3xl xs:text-2xl text-l pr-2 sm:pr-4">{ props.data.location }</p>
                    </div>
                </div>
            </div>
        </div>
      );
}

export default CurrentWeather