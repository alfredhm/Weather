export const formatCurrentWeather = (data) => {
  const {
    main: { temp },
    weather,
  } = data.data;

  const { icon } = weather[0];

  return {
    temp,
    icon,
  };
};

export const formatHourlyWeather = (data) => {
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

export const formatDailyWeather = (data) => {
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

export const formatDetails = (data) => {
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
}

export const formatToCurrent = (data, location) => {
  return {
    low: data.temp_min,
    curr: data.temp,
    high: data.temp_max,
    location: location,
    icon: data.icon,
  };
};

export const formatToDetails = (current) => {
  return {
    feelsLike: current.feels_like,
    uv: current.uvi,
    windSpeed: current.wind_speed,
    windDeg: current.wind_deg,
    humidity: current.humidity,
    visibility: current.visibility,
  };
};
