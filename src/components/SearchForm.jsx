import React from 'react'

// Icons/Images
import { FaSearch } from'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'

// Shoogle
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'

// Components
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox"

// Styles
import "@reach/combobox/styles.css"

const PlacesAutocomplete = () => {
  const {
    ready,
    value,
    setValue,
    suggestions: {status, data},
    clearSuggestions
  } = usePlacesAutocomplete({ requestOptions: { types: ['(cities)'] }, callbackName: 'initMap'})

  const handleSelect = async (address) => {
    setValue(address, false)
    clearSuggestions()

    const results = await getGeocode({ address })
    const { lat, lng } =  await getLatLng(results[0])

    console.log(lat, lng)
  }

  return (
    <Combobox className="z-20 w-full px-24" onSelect={handleSelect}>
      <ComboboxInput 
        value={value} 
        onChange={(e => setValue(e.target.value))} 
        disabled={!ready}
        className="combobox-input text-black w-full"
        placeholder="Search a city or airport"
      />
      <ComboboxPopover className="z-20 text-black">
        <ComboboxList>
          {status === "OK" && data.map(({place_id, description}) => (
            <ComboboxOption key={place_id} value={description}/>
          ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
}


const SearchForm = ({onSubmit, onChange, searches, results, handleUnitClick, isImperial}) => {

  const {
    value,
    setValue,
    suggestions: {status, data},
    clearSuggestions
  } = usePlacesAutocomplete({ 
        requestOptions: 
          { types: ['(cities)'] }, 
          callbackName: 'initMap'
      })

  const handleSelect = async (address) => {
    setValue(address, false)
    clearSuggestions()

    const results = await getGeocode({ address })
    const { lat, lng } =  await getLatLng(results[0])

    document.querySelector('#search').value = ""

    console.log(lat, lng)
    console.log(results[0].address_components[0].short_name)
  }

  return (
    <>
      <form
        onSubmit={handleSelect} className="flex flex-row w-4/5 md:w-3/4 lg:w-3/5 xl:w-1/2 2xl:w-1/3">
        <div className="backdrop-blur-xl rounded-xl z-10 w-full h-fit flex flex-row border-2 border-white/50">
          <div className={ results ? " flex flex-col items-center justify-center w-full h-full rounded-3xl" : " flex flex-col items-center justify-center w-full h-full rounded-full"}>
              <div className="w-full flex items-center">
                <div className="flex items-center justify-start w-full ml-1 my-1"> 
                  <FaSearch className="ml-3" size={20}/>
                  <input 
                    type="text" 
                    value={value} 
                    onChange={(e => setValue(e.target.value))} 
                    id="search" 
                    autoCorrect="off" 
                    autoComplete="off" 
                    autoFocus={true} 
                    placeholder='City, State, Country' 
                    className="w-full pr-2 rounded-xl ml-5 h-9  bg-transparent focus:border-none, outline-none placeholder:text-white placeholder:text-xs placeholder:xs:text-sm placeholder:sm:text-base"
                  />
                </div>
                <div onClick={handleUnitClick} className="flex items-center h-5 z-10 mr-4 justify-center hover:cursor-pointer">
                  <p className={isImperial ? "text-white/50" : "text-white"}>C</p>
                  <p className="text-3xl hover:text-white/50">|</p>
                  <p className={!isImperial ? "text-white/50" : "text-white"}>F</p>
                </div>
              </div>
              <div className="w-full">
                  <ul className="flex flex-col justify-start w-full">
                  {status === "OK" && data.map(({ place_id, description }) => (
                      <div key={place_id} className="flex flex-row items-center pl-1 py-1 w-full border-t-2 h-10 border-collapse text-xs xs:text-base border-white/30 hover:bg-zinc-400/40"
                        onClick={(event) => {
                          handleSelect(event.target.innerText)
                        }}>
                          <FaLocationDot className="ml-3" size={20}/>
                          <li className="ml-4">
                            {description}
                          </li>
                      </div>
                  ))}
                  </ul>
              </div>
            </div>
        </div>
      </form>
    </>

  )
}

export default SearchForm