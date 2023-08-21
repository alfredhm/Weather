import { getGeocode, getLatLng, getDetails } from 'use-places-autocomplete'
import { findLargest } from '../util/findLargest'

const getSearchData = async (address, initial, coords) => {
    let results
    let locationParts
    let location
    let lat
    let lng
    let placeId

    if (address === null) {
      const geocoder = new window.google.maps.Geocoder()
      const input = coords.lat.toString() + "," +  coords.lng.toString();
      const latlngStr = input.split(",", 2);
      const latlng = {
        lat: parseFloat(latlngStr[0]),
        lng: parseFloat(latlngStr[1]),
      };

      await geocoder
        .geocode({ location: latlng, })
        .then((response => {
          results = response.results
          const locationObject = results.filter((result) => result.types.includes("locality") || result.types.includes('administrative_area_level_2'))[0]
          location = locationObject.address_components[0].short_name
          placeId = locationObject.place_id
          lat = locationObject.geometry.location.lat()
          lng = locationObject.geometry.location.lng()
        }))
        .catch((error) => console.error(error))

    } else if (initial) {
      results = await getDetails({ placeId: address })
      location = results.vicinity
      placeId = results.place_id
      lat = coords.lat
      lng = coords.lng

    } else {
      results = await getGeocode({ address })
      locationParts = results[0].formatted_address.split(',')

      if (locationParts.length > 3) {
        location = locationParts[0] + locationParts[1].replace(/[0-9]/g, '')
      } else {
        location = locationParts[0].replace(/[0-9]/g, '')
      }
      
      let coords = getLatLng(results[0])
      lat = coords.lat
      lng = coords.lng
      placeId = results[0].place_id
    }

    const request = {
      placeId: placeId,
      fields: [
        "photos"
      ]
    }

  const map = new window.google.maps.Map(document.createElement('div'))
  const service =  new window.google.maps.places.PlacesService(map)

  service.getDetails(request, async (place, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      localStorage.setItem("background", await findLargest(place.photos))
    }})

  return {
    location: location, 
    coords: {lat: lat, lng: lng}, 
    placeId: placeId, 
    photo: localStorage.getItem("background")
  }
}

export default getSearchData