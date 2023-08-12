import axios from "axios";
import getImage from "./imageAPI";

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

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, temp_min, temp_max },
    name,
    dt,
    sys: { country },
    weather,
  } = data.data;

  const { icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    temp_min,
    temp_max,
    name,
    dt,
    icon,
    country,
  };
};

const formatHourlyWeather = (data) => {
  const hourly = [];
  for (let i = 0; i < 26; i++) {
    const time = new Date(data.hourly[i].dt * 1000)
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true,
        timeZone: data.timezone,
      })
      .toLowerCase()
      .replace(" ", "");
    const temp = Math.round(parseFloat(data.hourly[i].temp));
    const pop = parseInt(data.hourly[i].pop * 100);
    const {
      weather: [{ icon }],
    } = data.hourly[i];

    const hour = { time: time, temp: temp, icon: icon, pop: pop };
    hourly.push(hour);
  }
  return hourly;
};

const formatDailyWeather = (data) => {
  const daily = [];
  const isDay = data.hourly[0].weather[0].icon.includes("d");
  for (let i = 0; i < 8; i++) {
    const weekday = new Date(data.daily[i].dt * 1000).toLocaleString("en-US", {
      weekday: "short",
      timeZone: data.timezone,
    });
    const icon = data.daily[i].weather[0].icon;
    const { max, min } = data.daily[i].temp;
    const pop = parseInt(data.daily[i].pop * 100);
    const day = {
      day: weekday,
      icon: icon,
      high: Math.round(parseFloat(max)),
      low: Math.round(parseFloat(min)),
      pop: pop,
    };
    daily.push(day);
  }
  const dailyData = {
    daily: daily,
    isDay: isDay,
  };
  return dailyData;
};

const formatDetails = (data) => {
  const {
    sunrise,
    sunset,
    feels_like,
    pressure,
    humidity,
    uvi,
    visibility,
    wind_speed,
    wind_deg,
    weather: [{ main, description }],
  } = data.current;

  return {
    sunrise,
    sunset,
    feels_like,
    pressure,
    humidity,
    uvi,
    visibility,
    wind_speed,
    wind_deg,
    main,
    description,
  };
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
