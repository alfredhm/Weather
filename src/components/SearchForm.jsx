import React from 'react'

// Icons/Images
import { FaSearch } from'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'

// Zod 
import { useForm } from'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'



const SearchForm = ({onSubmit, onChange, searches, results, handleUnitClick, isImperial}) => {
  const schema = z.object({
    location: z.string().min(3, { message: "Location Input Must Have 3 Characters"})
  })

  const {
    register,
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(schema)})


  return (
    <>
      <form
        onChange={(event) => onChange(event.target.value)}
        onSubmit={handleSubmit((data) => {
          onSubmit(data.location)
          reset()
      })} className="flex flex-row w-4/5 md:w-3/4 lg:w-3/5 xl:w-1/2 2xl:w-1/3">
        <div className="backdrop-blur-xl rounded-xl z-10 w-full h-fit flex flex-row border-2 border-white/50">
          <div className={ results ? " flex flex-col items-center justify-center w-full h-full rounded-3xl" : " flex flex-col items-center justify-center w-full h-full rounded-full"}>
              <div className="w-full flex items-center">
                <div className="flex items-center justify-start w-full ml-1 my-1"> 
                  <FaSearch className="ml-3" size={20}/>
                  <input type="text" id="search" {...register('location')} autoCorrect="off" autoComplete="off" autoFocus={true} placeholder='City, State, Country' className="w-full pr-2 rounded-xl ml-5 h-9  bg-transparent focus:border-none, outline-none placeholder:text-white placeholder:text-xs placeholder:xs:text-sm placeholder:sm:text-base"/>
                </div>
                <div onClick={handleUnitClick} className="flex items-center h-5 z-10 mr-4 justify-center hover:cursor-pointer">
                  <p className={isImperial ? "text-white/50" : "text-white"}>C</p>
                  <p className="text-3xl hover:text-white/50">|</p>
                  <p className={!isImperial ? "text-white/50" : "text-white"}>F</p>
                </div>
              </div>
              {results && 
              <div className="w-full">
                  <ul className="flex flex-col justify-start w-full">
                  {searches.map((search, index) => (
                      <div key={index} className={ "flex flex-row items-center pl-1 py-1 w-full border-t-2 h-10 border-collapse text-xs xs:text-base border-white/30 hover:bg-zinc-400/40"}
                        onClick={(event) => {
                          onSubmit(event.target.innerText)
                          reset()
                        }}>
                          <FaLocationDot className="ml-3" size={20}/>
                          <li className="ml-4">
                            {search.description}
                          </li>
                      </div>
                  ))}
                  </ul>
              </div>
              }
            </div>
        </div>
      </form>
    </>

  )
}

export default SearchForm