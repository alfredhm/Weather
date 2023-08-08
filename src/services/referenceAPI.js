import axios from "axios";

const findLargest = (images) => {
  let max = images[0];
  for (let i = 0; i < images.length; i++) {
    if (images[i].width > max.width) {
      max = images[i];
    }
  }
  return max.photo_reference;
};

async function referenceAPI(place_id) {
  try {
    const response = await axios({
      method: "GET",
      url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=photo&key=${process.env.REACT_APP_GOOGLE_API}`,
    });
    const photoReference = findLargest(response.data.result.photos);
    return photoReference;
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

export default referenceAPI;
