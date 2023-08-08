import React from 'react'

// Icons/Images
import { BiSolidError } from 'react-icons/bi'

  
const handleClose = () => {
  const cover = document.querySelector("#app-cover")
  const modal = document.querySelector("#error-modal")
  cover.style.display = "none"
  modal.style.display = "none"
}

const Error = ({ error }) => {
  return (
    <div id="error-modal" className="border-2 border-white/50 rounded-xl h-52 w-96 absolute z-30 backdrop-blur-3xl flex flex-col items-center justify-center">
        <div className="h-1/3 w-full flex flex-col items-end px-3">
        <p onClick={handleClose} className="text-3xl hover:text-white/50 hover:cursor-pointer">&times;</p>
        </div>
        <div className="h-2/3 flex flex-row items-start justify-start">
        <div className="flex flex-row items-center">
            <BiSolidError size={70}/>
            <p className="text-2xl font-extrabold pl-4" >{error.includes('429') ? "Out Of API Calls" :  error.includes("'data.data' as it is undefined") ? "Error Fetching Data" : error.includes('Network') ? "No Internet" : error}</p>
        </div>
        </div>
    </div>
  )
}

export default Error