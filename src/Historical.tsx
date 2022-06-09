import React from 'react';
import { Link } from 'react-router-dom';
import icon from './Img/we.jpg';
import wind from './Img/kindpng_1103327.png';
import './App.css';
import './style.css'; 

function Historical() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var g = function (v:string):HTMLInputElement|HTMLButtonElement|HTMLDivElement|HTMLImageElement|HTMLSpanElement|null { return document.querySelector(v); }
  var token:string = "9da99704ae862d2cd2a51e131b201d03";
  var place:string|null = urlParams.get('name');
//   var historical_date:string = "2015-01-21"
//   var hourly:string = "2"
//   var url:string = "http://api.weatherstack.com/current?access_key=" + token + "&query=" + place;
// var url2:string = "http://api.weatherstack.com/historical?access_key=" + token + "&query=" + place + "&historical_date=" + historical_date + "&hourly=" + hourly;



  var HistoricalWeather =()=>{
      var d = g("#date")as HTMLInputElement;
      var h = g("#hour")as HTMLInputElement;
      var len = d.value.length as number;
      if(d.value !=null && len>1){

      var url = "http://api.weatherstack.com/historical?access_key=" + token + "&query=" + place + "&historical_date=" + d.value + "&hourly=" + h.value;
     
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if(data.success===false){
                    alert(data.error.info);
                }else{
                    console.log(JSON.stringify(data));
                    putData(data);
                    putDatHistorical(data["historical"]["2008-07-01"]["hourly"]);
                }
                
            })
            .catch(e=>alert(e));
      }else{
          alert("please fill all inputs")
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
  "weather_code": string|number,
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
  

interface hour{
            "time": number|string,
            "temperature": number,
            "wind_speed": number,
            "wind_degree": number,
            "wind_dir": string,
            "weather_code": number,
            "weather_icons": Array<string>,
            "weather_descriptions": Array<string>,
            "precip": number,
            "humidity": number,
            "visibility": number,
            "pressure": number,
            "cloudcover": number,
            "heatindex": number,
            "dewpoint": number,
            "windchill": number,
            "windgust": number,
            "feelslike": number,
            "chanceofrain": number,
            "chanceofremdry": number,
            "chanceofwindy": number,
            "chanceofovercast": number,
            "chanceofsunshine": number,
            "chanceoffrost": number,
            "chanceofhightemp": number,
            "chanceoffog": number,
            "chanceofsnow": number,
            "chanceofthunder": number,
            "uv_index": number

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

  var putDatHistorical=(data:Array<hour>)=>{
    
    var div = g("#history") as HTMLDivElement;
    div.innerHTML ="";
    var html:string = (g("#sample .card")as HTMLDivElement).innerHTML;
    data.forEach(d => {
          var card = document.createElement("div");
          card.setAttribute("class","card");
          card.setAttribute("style","display:block");
          card.innerHTML = html;
          div.appendChild(card);

        (card.querySelector(".name")as HTMLSpanElement).textContent = "hour "+String(d.time);
        (card.querySelector(".temp")as HTMLSpanElement).textContent = d.temperature + "°";
        (card.querySelector(".feelslike")as HTMLSpanElement).textContent = "feel " + d.feelslike + "°";
        (card.querySelector(".img")as HTMLImageElement).src = d.weather_icons[0];
        (card.querySelector(".wind span")as HTMLSpanElement).textContent = d.wind_speed + "km/h";
        (card.querySelector(".wind_deg")as HTMLSpanElement).textContent = d.wind_degree + "";
        (card.querySelector(".wind_dir")as HTMLSpanElement).textContent = d.wind_dir + "";
        (card.querySelector(".visi")as HTMLSpanElement).textContent = "V " + d.visibility;
        (card.querySelector(".uv")as HTMLSpanElement).textContent = d.uv_index + " UV";
        (card.querySelector(".desc")as HTMLSpanElement).textContent = d.weather_descriptions[0];


          
    });
    

    
}


  var Name=()=>{return(
    <h1>{place}</h1>
  )};


  return (
    <div className="Historical">
      
      <div className="hello" id="sample">
        <Link to={"/"}>
            <h2>Weather Report Home</h2>
        </Link>
        <Name />
        
        

        <input type="date" id="date"  placeholder="enter date" />
        <br />
        <br />
        <input type="number" id="hour" min={1} placeholder="enter hours" />
        <br />
        <br />
        <button onClick={HistoricalWeather} >Get Historical Weather Report</button>

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
          <div id="history">

          </div>

      </div>


    </div>
  );
}

export default Historical;
