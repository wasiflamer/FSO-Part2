import { useState, useEffect } from "react";
import axios from "axios";

const DetailPanel = ({
  name,
  capital,
  area,
  img_src,
  languages,
  setWeatherData,
  WeatherData,
}) => {
  let api_key = process.env.REACT_APP_VITE_SOME_KEY;

  // fetch the weather data of the current country
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${api_key}&units=metric`
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <h1>{name}</h1>
      <p>Capital {capital}</p>
      <p>Area {area}</p>
      <h2>Languages:</h2>
      <ul>
        {Object.entries(languages).map(([key, name]) => (
          <li key={key}>{name}</li>
        ))}
      </ul>
      <img src={img_src} alt="flag_image" />

      <h1>Weather in {capital}:</h1>

      {Object.keys(WeatherData).length > 0 ? (
        <p> Temperature {WeatherData.main["temp"]} Celcius</p>
      ) : (
        "loading!"
      )}

      {Object.keys(WeatherData).length > 0 ? (
        <img
          src={`https://openweathermap.org/img/wn/${WeatherData.weather[0]["icon"]}@2x.png`}
          alt="description_of_weather"
        />
      ) : (
        "loading!"
      )}

      {Object.keys(WeatherData).length > 0 ? (
        <p> wind speed is {WeatherData.wind["speed"]} m/s</p>
      ) : (
        "loading!"
      )}
    </>
  );
};

const ShowResults = ({
  searchTerm,
  setData,
  data,
  WeatherData,
  setWeatherData,
}) => {
  // if return data is not empty then return details otherwise empty div
  if (Object.keys(data).length > 0) {
    return (
      <DetailPanel
        name={data.name["common"]}
        capital={data.capital[0]}
        area={data.area}
        languages={data.languages}
        img_src={data.flags["png"]}
        WeatherData={WeatherData}
        setWeatherData={setWeatherData}
      />
    );
  }

  return <div></div>;
};

const App = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [WeatherData, setWeatherData] = useState([]);

  useEffect(() => {
    console.log("effect run, search term is now", value);

    // skip if currency is not defined
    if (value) {
      console.log("fetching countries ...");
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${value}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [value]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <form>
        Countries <input value={value} onChange={handleChange} />
      </form>
      <ShowResults
        searchTerm={value}
        setData={setData}
        data={data}
        setWeatherData={setWeatherData}
        WeatherData={WeatherData}
      />
    </div>
  );
};
export default App;
