import React, { useEffect, useState } from 'react'
import Day from "../media/gifs/Day.mp4"
import DayCloudy from "../media/gifs/DayCloudy.mp4"
import DayLightning from "../media/gifs/DayLightning.mp4"
import DaySnow from "../media/gifs/DaySnow.mp4"
import Drizzle from "../media/gifs/Drizzle.mp4"
import Night from "../media/gifs/Night.mp4"
import NightCloudy from "../media/gifs/NightCloudy.mp4"
import NightLightning from "../media/gifs/NightLightning.mp4"
import NightSnow from "../media/gifs/NightSnow.mp4"
import Rain from "../media/gifs/Rain.mp4"

const backgroundMap = new Map([
  ["01d", Day],
  ["01n", Night],
  ["02d", DayCloudy],
  ["02n", NightCloudy],
  ["03d", DayCloudy],
  ["03n", NightCloudy],
  ["04d", DayCloudy],
  ["04n", NightCloudy],
  ["09d", Drizzle],
  ["09n", Drizzle],
  ["10d", Rain],
  ["10n", Rain],
  ["11d", DayLightning],
  ["11n", NightLightning],
  ["13d", DaySnow],
  ["13n", NightSnow],
  ["50d", DayCloudy],
  ["50n", NightCloudy],
])

const setPlayback = () => {
  const video = document.querySelector('video')
  video.playbackRate = 0.75
}

const GetBackground = (data) => {
  return (
    <video onPlay={setPlayback} key={backgroundMap.get(data.data.cond)} className="w-screen h-2screen object-cover inset-0 absolute bg-top" autoPlay={true} loop={true} muted={true} playsInline={true}>
        <source src={backgroundMap.get(data.data.cond)} type="video/mp4" className=" scale-100" />
    </video>
  )
}

export default GetBackground

