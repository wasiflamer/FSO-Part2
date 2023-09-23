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
  the_ace_value,
}) => {
  let api_key = process.env.REACT_APP_VITE_SOME_KEY;

  // fetch the weather data of the current country
  useEffect(() => {
    console.log(` sxe ===  ${name}`);
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
  }, [name]);

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
  setcountries,
  countries,
  filteredNames,
  the_ace_value,
}) => {
  // testing here !
  useEffect(() => {
    if (the_ace_value.length != 0) {
      axios
        .get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${the_ace_value}`
        )
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [the_ace_value]);

  if (the_ace_value.length > 1) {
    if (the_ace_value.length <= 10) {
      return (
        <ul>
          {the_ace_value.map((x) => (
            <li key={x}>
              {x} {<button>show</button>}
            </li>
          ))}
        </ul>
      );
    } else if (the_ace_value.length >= 11) {
      return <p>to many results refine query ! </p>;
    }
  }

  if (data.length != 0 && the_ace_value.length == 1) {
    return (
      <DetailPanel
        name={data.name["common"]}
        capital={data.capital[0]}
        area={data.area}
        languages={data.languages}
        img_src={data.flags["png"]}
        WeatherData={WeatherData}
        setWeatherData={setWeatherData}
        the_ace_value={the_ace_value}
      />
    );
  }

  return <div></div>;
};

const App = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [countries, setcountries] = useState([]);
  const [WeatherData, setWeatherData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setcountries(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [countries]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  let list_of_all = [];
  countries.forEach((element) => {
    list_of_all.push(element.name["common"]);
  });

  const filteredNames = [];

  if (value.length > 0) {
    filteredNames.push(
      list_of_all.filter((x) => {
        if (x.toLowerCase().includes(value.toLowerCase())) return x;
      })
    );
  }

  let the_ace_value;

  if (filteredNames.length === 0) {
    the_ace_value = "";
  } else {
    the_ace_value = filteredNames[0];
  }

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
        countries={countries}
        setcountries={setcountries}
        filteredNames={filteredNames}
        value={value}
        setValue={value}
        the_ace_value={the_ace_value}
      />
    </div>
  );
};
export default App;
