import React from 'react'
import axios from 'axios'

async function getImage(photo_reference) {
    try {
        const response = await axios({
            method: 'GET',
            url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=2500&photoreference=${photo_reference}&key=${process.env.REACT_APP_GOOGLE_API}`
        })
        return (
            <img src={response.config.url}/>
        )
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

export default getImage