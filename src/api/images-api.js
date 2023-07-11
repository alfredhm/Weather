import axios from "axios"

async function getLocationId(search) {
    try {
        const response = await axios({
            method: 'GET',
            url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&types=(cities)&key=${process.env.REACT_APP_GOOGLE_API}`
        })

        console.log(response.data)
        return response.data

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

export default getLocationId