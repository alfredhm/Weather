import React from 'react'

// Icons/Images
import { BiSolidError } from 'react-icons/bi'


const Error = ({ error, onClose }) => {
  return (
    <div id="error-modal" className="border-2 border-white/50 rounded-xl h-52 w-96 absolute z-30 backdrop-blur-3xl flex flex-col items-center justify-center">
        <div className="h-1/3 w-full flex flex-col items-end px-3">
          <p onClick={onClose} className="text-3xl hover:text-white/50 hover:cursor-pointer">&times;</p>
        </div>
        <div className="h-2/3 flex flex-row items-start justify-start">
        <div className="flex flex-row items-center pl-6">
            <BiSolidError size={90}/>
            <div className="flex items-center justify-center">
              <p className="text-2xl font-extrabold w-3/4" >{error.message.includes("Cannot read properties of undefined (reading '0')") ? "Out Of API Calls \n Come Back Later" :  error.message.includes("'data.data' as it is undefined") ? "Error Fetching Data" : error.message.includes('Network') ? "No Internet" : error.message}</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Error