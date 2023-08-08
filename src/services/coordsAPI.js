import axios from "axios";

async function coordsAPI(place_id) {
  const googleKey = process.env.REACT_APP_GOOGLE_API;
  try {
    const response = await axios({
      method: "GET",
      url: `https://maps.googleapis.com/maps/api/place/details/json?fields=geometry&place_id=${place_id}&key=${googleKey}`,
    });
    return {
      lat: response.data.result.geometry.location.lat,
      lon: response.data.result.geometry.location.lng,
    };
  } catch (error) {
    if (error.response) {
      console.log("The server responded with an error");
    } else if (error.request) {
      console.log("There was an error with the request");
    } else {
      console.log(error);
    }
    console.log(error.config);
  }
}

export default coordsAPI;
