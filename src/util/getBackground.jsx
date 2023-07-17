import React, { useEffect } from 'react'
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



const getBackground = (data) => {

  console.log("Day Or Night: ", data.dayOrNight)
  console.log(data)
  // Day, DayCloudy, DayLightning, DaySnow, Drizzle, Night, NightCloudy, NightSnow, NightLightning
  let source = null
  if (data.condId < 805 && data.condId > 800) {
    source = data.dayOrNight === "day" ? DayCloudy : NightCloudy
  } else if (data.condId === 800) {
    source = data.dayOrNight === "day" ? Day : Night
  } else if (data.condId < 800 && data.condId > 700) {
    source = data.dayOrNight === "day" ? DayCloudy : NightCloudy
  } else if (data.condId < 623 && data.condId > 599) {
    source = data.dayOrNight === "day" ? DaySnow : NightSnow
  } else if (data.condId < 532 && data.condId > 499) {
    source = Rain
  } else if (data.condId < 322 && data.condId > 299) {
    source = Drizzle
  } else if (data.condId < 232 && data.condId > 199) {
    source = data.dayOrNight === "day" ? DayLightning : NightLightning
  }
  
  const setPlaybackRate = () =>{
    const video = document.querySelector("video")
    video.playbackRate = 0.5
  }

  return (
    <video onPlay={setPlaybackRate} className="w-screen h-2screen object-cover inset-0 absolute bg-top" autoPlay={true} loop={true} muted={true} playsInline={true}>
        <source src={source} type="video/mp4" className=" scale-100" />
    </video>
  )
}

export default getBackground

