import React from 'react'

const CurrentWeather = () => {

    const url = "https://images2.minutemediacdn.com/image/upload/c_fill,w_1440,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/iStock-104472907-ec1d53a7c5724086414f13ae0dab8e1b.jpg"

    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col h-40 justify-center bg-cover bg-center rounded-xl backdrop-blur-xl font-semibold w-fit p-5">
                <div className="flex flex-row justify-center gap-3">
                    <p className="flex items-center">L:80°</p>
                    <p className=" text-5xl">86°</p>
                    <p className="flex items-center">H:97°</p>
                </div>
                <div className="text-center">
                    <p className="text-4xl">Houston</p>
                </div>
            </div>
        </div>

      );
}

export default CurrentWeather