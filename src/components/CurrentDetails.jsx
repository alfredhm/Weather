import React from 'react'

const CurrentDetails = () => {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3%">
        <div className="backdrop-blur-xl rounded-xl w-full aspect-square">
            <div className="backdrop-blur-xl flex flex-col items-center justify-center ">
                <p>Feels Like</p>
                <p>92°</p>
            </div>
        </div>
        <div className="backdrop-blur-xl rounded-xl w-full aspect-square">
            <div>
                <p>UV Index</p>
                <p>Low</p>
                <p>0</p>
            </div>   
        </div>         
        <div className="backdrop-blur-xl rounded-xl w-full aspect-square">
            <div>
                <p>Wind</p>
                <p>NW</p>
                <p>7 mph</p>
            </div>
        </div>
        <div className="backdrop-blur-xl rounded-xl w-full aspect-square">
            <div>
                <p>Humidity</p>
                <p>71%</p>
            </div>
        </div>
        <div className="backdrop-blur-xl rounded-xl w-full aspect-square">
            <div>
                <p>Visibility</p>
                <p>15 miles</p>
            </div>
        </div>
    </div>
  )
}

export default CurrentDetails