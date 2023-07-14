import React from 'react'

const CurrentWeather = ( data ) => {

    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col h-40 items-center justify-center bg-cover bg-center rounded-xl backdrop-blur-2xl font-semibold w-fit sm:p-20 p-10">
                <div className="flex flex-row justify-center gap-3">
                    <p className="flex items-center">L:{ parseInt(data.data.low) }&deg;</p>
                    <p className=" md:text-5xl text-4xl">{ parseInt(data.data.curr) }&deg;</p>
                    <p className="flex items-center">H:{ parseInt(data.data.high)}&deg;</p>
                </div>
                <div className="text-center">
                    <p className="md:text-4xl text-3xl">{ data.data.location }</p>
                </div>
            </div>
        </div>

      );
}

export default CurrentWeather