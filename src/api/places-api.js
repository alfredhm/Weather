import axios from 'axios'

async function placesAPI(search) {
  const googleKey = process.env.REACT_APP_GOOGLE_API
  try {
    const response = await axios({
        method: "GET",
        url:`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&types=(cities)&key=${googleKey}`,
    })
    
    return response.data.predictions

  } catch(error) {
    if (error.response) {
        console.log("The server responded with an error")
    } else if (error.request) {
        console.log("There was an error with the request")
    } else {
        console.log(error)
    }
    console.log(error.config)
  }
}

export default placesAPI