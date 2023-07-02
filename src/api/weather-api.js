const API_KEY = "1f819827af65b03b5a00f27f5e54f1ef"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

const getWeatherData = (info, searchParams) => {
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