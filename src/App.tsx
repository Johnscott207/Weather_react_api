import React from 'react';
import icon from './Img/we.jpg';
import wind from './Img/kindpng_1103327.png';
import './App.css';
import './style.css'; 

function App() {

  var g = function (v:string):HTMLInputElement|HTMLButtonElement|HTMLDivElement|HTMLImageElement|HTMLSpanElement|null { return document.querySelector(v); }
  var token:string = "9da99704ae862d2cd2a51e131b201d03";
  var place:string = "New York";
  var historical_date:string = "2015-01-21"
  var hourly:string = "2"
  var url:string = "	http://api.weatherstack.com/current?access_key=" + token + "&query=" + place;
  var url2:string = "	http://api.weatherstack.com/historical?access_key=" + token + "&query=" + place + "&historical_date=" + historical_date + "&hourly=" + hourly;



  var currentWeather =()=>{
      var d = g("input")as HTMLInputElement;
      var len = d.value.length as number;
    if(d.value !=null && len>1){
      place = d.value;
      url = "http://api.weatherstack.com/current?access_key=" + token + "&query=" + place;
      fetch(url)
           .then(response => response.json())
           .then(data => { console.log(JSON.stringify(data)); putData(data) })
           .catch(e=>{alert(e)});
    }else{
      alert("please enter city name");
    }
  }

  interface weather {
    "request": {
        "type": string,
        "query": string,
        "language": string,
        "unit": string
    },
    "location": {
        "name": string,
        "country": string,
        "region": string,
        "lat": string,
        "lon": string,
        "timezone_id": string,
        "localtime": string,
        "localtime_epoch": Number,
        "utc_offset": string
    },
    "current": current
}


interface current{
  "observation_time": string,
  "temperature": Number,
  "weather_code": string,
  "weather_icons": Array<string>,
  "weather_descriptions": Array<string>,
  "wind_speed": Number,
  "wind_degree": Number,
  "wind_dir": string,
  "pressure": Number,
  "precip": Number,
  "humidity": Number,
  "cloudcover": Number,
  "feelslike": Number,
  "uv_index": Number,
  "visibility": Number
}
  

  var putData=(data:weather)=>{
      var d:current = data["current"];
      (g(".card")as HTMLDivElement).style.display = "block";
      (g(".card .name")as HTMLSpanElement).textContent = data["location"].name;
      (g(".card .temp")as HTMLSpanElement).textContent = d.temperature + "°";
      (g(".card .feelslike")as HTMLSpanElement).textContent = "feel " + d.feelslike + "°";
      (g(".card .img")as HTMLImageElement).src = d.weather_icons[0];
      (g(".card .wind span")as HTMLSpanElement).textContent = d.wind_speed + "km/h";
      (g(".card .wind_deg")as HTMLSpanElement).textContent = d.wind_degree + "";
      (g(".card .wind_dir")as HTMLSpanElement).textContent = d.wind_dir + "";
      (g(".card .visi")as HTMLSpanElement).textContent = "V " + d.visibility;
      (g(".card .uv")as HTMLSpanElement).textContent = d.uv_index + " UV";
      (g(".card .desc")as HTMLSpanElement).textContent = d.weather_descriptions[0];
  }

  var historical_route=()=>{
    var d = g("input")as HTMLInputElement;
    var len = d.value.length as number;
    if(d.value !=null && len>1){
      window.location.href ="/historical?name="+d.value;
    }else{
      alert("please enter city name");
    }
  };



  return (
    <div className="App">
      
      <div className="hello" id="sample">

        <h1>Weather Report</h1>

        <input type="text" list="languages" placeholder="Your City" />
        <datalist id="languages">
          <option value="Delhi">Delhi</option>
          <option value="New York">New York</option>
          <option value="London">London</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Tokyo">Tokyo</option>
          <option value="Brazil">Brazil</option>
        </datalist>
        <br />
        <button onClick={currentWeather} >Get Current Weather Report</button>
        <br />
        <button onClick={historical_route}>Get Historical Weather Report</button>

        <br />
        <br />
        <br />
        <br />
          <div className="card">
            <img className="img" src={icon} alt='' />

            <span className="name">New York</span>
            <span className="temp">13°</span>
            <span className="feelslike">feel 13°</span>
            <span className="wind">
              <img src={wind} alt='' />
              <span>0km/h</span>
            </span>
            <span className="wind_deg">349</span>
            <span className="wind_dir">N°</span>
            <span className="visi">V 16</span>
            <span className="uv">4 UV</span>
            <span className="desc">Blowing Widespread Dust</span>  
          </div>

      </div>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
