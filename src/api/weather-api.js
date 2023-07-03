const API_KEY = process.env.REACT_APP_API_KEY
const BASE_URL = process.env.REACT_APP_BASE_URL

const getWeatherData = (info, searchParams) => {
    console.log(BASE_URL + "/" + info)
    const url = new URL(BASE_URL + "/" + info)
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY})

    return fetch(url).then((res) => res.json())
}

const formatCurrentWeather = (data) => {
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed, deg}
    } = data

    const {main: details, icon} = weather[0]

    return {
        lat,
        lon, 
        temp, 
        feels_like, 
        temp_min, 
        temp_max, 
        humidity, 
        name, 
        dt, 
        country, 
        sunrise, 
        sunset, 
        details, 
        icon, 
        speed, 
        deg 
    }
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather)
    return formattedCurrentWeather
}


export default getFormattedWeatherData