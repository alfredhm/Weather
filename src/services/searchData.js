import { getGeocode, getLatLng, getDetails } from 'use-places-autocomplete'
import { findLargest } from '../util/findLargest'

const getPhoto = (request) => {
  const map = new window.google.maps.Map(document.createElement('div'))
  const service =  new window.google.maps.places.PlacesService(map)
  var photo

  service.getDetails(request, async (place) => {
    photo = await findLargest(place.photos)
    console.log(photo)
    return photo
  })
}

const getSearchData = async (address, initial, coords) => {
    let results
    let locationParts
    let location
    let lat
    let lng
    let placeId

    if (initial) {
      results = await getDetails({ placeId: address })
      location = results.address_components[3].long_name
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

      let coords =  await getLatLng(results[0])
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

    const photo = getPhoto(request)
    console.log(photo)

    return {
      location: location, 
      coords: {lat: lat, lng: lng}, 
      placeId: placeId, 
      background: photo
    }


}

export default getSearchData