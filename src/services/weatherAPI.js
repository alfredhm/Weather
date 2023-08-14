import axios from "axios";
import { formatCurrentWeather, formatHourlyWeather, formatDailyWeather, formatDetails } from "../util/formats";

const getWeatherData = async (info, searchParams, coords) => {
  try {
    const data = await axios.get(process.env.REACT_APP_BASE_URL + "/" + info, {
      params: { ...searchParams, appid: process.env.REACT_APP_API_KEY },
    });
    return data;
  } catch (err) {
    try {
      const { q, ...params } = searchParams;
      const data = await axios.get(process.env.REACT_APP_BASE_URL + "/" + info, {
        params: { ...params, lat: coords.lat, lon: coords.lon, appid: process.env.REACT_APP_API_KEY },
      });
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
};

const getOneCallData = async (lat, lon, units) => {
  try {
    const data = await axios.get(process.env.REACT_APP_ONE_CALL_URL, {
      params: { units: units, lat: lat, lon: lon, appid: process.env.REACT_APP_API_KEY },
    });
    return data.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};


const getFormattedWeatherData = async (searchParams, coords) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams,
    coords
  ).then(formatCurrentWeather);

  const oneCallData = await getOneCallData(
    coords.lat,
    coords.lng,
    searchParams.units,
  );
  //const formattedCurrentWeather = formatCurrentWeather(oneCallData)
  console.log(oneCallData.daily[0])
  const formattedDailyWeatherData = formatDailyWeather(oneCallData);
  const formattedDailyWeather = formattedDailyWeatherData.daily;
  const isDay = formattedDailyWeatherData.isDay;
  const formattedHourlyWeather = formatHourlyWeather(oneCallData);
  const formattedDetails = formatDetails(oneCallData);
  const condId = oneCallData.current.weather[0].id;
  return {
    current: formattedCurrentWeather,
    hourly: formattedHourlyWeather,
    isDay: isDay,
    daily: formattedDailyWeather,
    details: formattedDetails,
    condId: condId,
  };
};

export default getFormattedWeatherData;
