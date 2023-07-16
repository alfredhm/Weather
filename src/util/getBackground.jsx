import React from 'react'
import Day from "../media/gifs/Day.mp4"
import DayCloudy from "../media/gifs/DayCloudy.mp4"
import DayLightning from "../media/gifs/DayLightning.mp4"
import DaySnow from "../media/gifs/DaySnow.mp4"
import Drizzle from "../media/gifs/Drizzle.mp4"
import Mist from "../media/gifs/Mist.mp4"
import Night from "../media/gifs/Night.mp4"
import NightCloudy from "../media/gifs/NightCloudy.mp4"
import NightLightning from "../media/gifs/NightLightning.mp4"
import NightSnow from "../media/gifs/NightSnow.mp4"
import Rain from "../media/gifs/Rain.mp4"

import houston from '../media/houston.jpg'


const getBackground = (condId, dayOrNight) => {

  let source = null
  if (condId > 800 && condId < 805) {
    source = dayOrNight === "day" ? DayCloudy : NightCloudy
  } else if (condId == 800) {
    source = dayOrNight === "day" ? Day : Night
  } else if (condId < 800 && condId > 700) {
    source = Mist
  } else if (condId < 623 && condId > 599) {
    source = dayOrNight === "day" ? DaySnow : NightSnow
  } else if (condId < 532 && condId > 499) {
    source = Rain
  } else if (condId < 322 && condId > 299) {
    source = Drizzle
  } else if (condId < 232 && condId > 199) {
    source = dayOrNight === "day" ? DayLightning : NightLightning
  }

  return (
    <>
        <video className=" w-full h-full object-cover inset-0 fixed -z-10 rounded-xl bg-center" autoPlay={true} loop={true} muted={true} playsInline={true}>
            <source src={source} type="video/mp4" className="scale-x-150" />
        </video>
    </>
  )
}

export default getBackground

