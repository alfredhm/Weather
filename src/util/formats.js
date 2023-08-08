export const formatToCurrent = (data) => {
  return {
    low: data.temp_min,
    curr: data.temp,
    high: data.temp_max,
    location: data.name,
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
