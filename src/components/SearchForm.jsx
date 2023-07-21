import React from 'react'

// Icons/Images
import { FaSearch } from'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'

// Zod 
import { useForm } from'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'



const SearchForm = ({onSubmit, onChange, searches, results}) => {

    
  const schema = z.object({
    location: z.string().min(3, { message: "Location Input Must Have 3 Characters"})
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema)})

  return (
    <form
        onChange={(event) => onChange(event.target.value)}
        onSubmit={handleSubmit((data) => {
          onSubmit(data.location)
          reset()
    })} className=" w-4/5 md:w-3/4 lg:w-3/5 xl:w-1/2  2xl:w-1/3 backdrop-blur-xl rounded-xl">
        <div className="border-2 border-white/50 backdrop-blur-xl min-h-60px relative flex flex-col items-center justify-center rounded-xl px-3 py-2 sm:px-6 md:px-8">
            <div className="border-2 border-white/50 flex flex-col items-center justify-center w-full h-full rounded-xl">
            <div className="flex items-center justify-start ml-5 my-1 w-full">
                <FaSearch size={20}/>
                <input type="search" id="search" {...register('location')} autoCorrect="off" autoComplete="off" onFocus={() => console.log()} autoFocus={true} placeholder='City, State, Country' className="w-3/5 rounded-xl ml-2 h-10  bg-transparent focus:border-none, outline-none placeholder:text-white placeholder:text-xs placeholder:xs:text-sm placeholder:sm:text-base"/>
            </div>
            {results && 
            <div className="w-full">
                <ul className="flex flex-col justify-start w-full">
                {searches.map((search, index) => (
                    <div key={index} className="flex flex-row py-2 border-y-2 pl-4 gap-2 text-xs xs:text-base border-white/30 hover:bg-zinc-400/40"
                      onClick={(event) => {
                        onSubmit(event.target.innerText)
                        reset()
                      }}>
                        <FaLocationDot size={20}/>
                        <li>
                          {search.description}
                        </li>
                    </div>

                ))}
                </ul>
            </div>
            }
            </div>
        </div>
        {errors.location && <div className="flex items-center justify-center w-full"><p className="backdrop-blur-xl">{errors.location.message}</p></div>}
    </form>
  )
}

export default SearchForm