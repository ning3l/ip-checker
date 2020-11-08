import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
const { DateTime } = require("luxon");

// at_FKwdNz91jouacgCII1IrhmMNQDgFu

function App() {
  var hi = DateTime;

  const [userData, setUserData] = useState({
    ip: null,
    country: "",
    city: "",
    lat: 0,
    lng: 0,
    flag: "",
    altSpellings: [],
    borders: [],
    timezones: "",
  });

  useEffect(() => {
    fetch(
      "https://geo.ipify.org/api/v1?apiKey=at_FKwdNz91jouacgCII1IrhmMNQDgFu"
    )
      .then((res) => res.json())
      .then((data) => {
        setUserData((prev) => ({
          ...prev,
          ip: data.ip,
          country: data.location.country,
          city: data.location.city,
          lat: data.location.lat,
          lng: data.location.lng,
        }));

        return fetch("https://restcountries.eu/rest/v2/name/Germany")
          .then((res) => res.json())
          .then((data) => {
            setUserData((prev) => ({
              ...prev,
              flag: data[0].flag,
              altSpellings: [...data[0].altSpellings],
              borders: [...data[0].borders],
              timezones: [...data[0].timezones][0],
            }));
          });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <h2>Welcome, random human!</h2>
      <p>Your IP address is {userData.ip}</p>
      {!userData.lat ? (
        "Loading..."
      ) : (
        <MapContainer
          id="mymap"
          center={[userData.lat, userData.lng]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[userData.lat, userData.lng]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      )}
      <div>
        <h4>Additional Infos</h4>
        <p>your curr time is {hi}</p>
        <div>
          <span>Your local time is {userData.timezones}</span>
          <span>In Kiew it is ???</span>
          <img src={userData.flag} style={{ width: 30 }} />
          <ul style={{ listStyle: "none" }}>
            {userData.altSpellings.map((el) => (
              <li>{el}</li>
            ))}
          </ul>
          <ul style={{ listStyle: "none" }}>
            {userData.borders.map((el) => (
              <li>{el}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
