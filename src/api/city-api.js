import React from 'react'
import axios from 'axios'

async function cityAPI(lat, lng) {
    try {
        const data = await axios({
            method: "GET",
            url: `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
        })
    
        return data.data.city
    } catch (error) {
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

export default cityAPI