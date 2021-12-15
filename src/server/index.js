// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
var path = require('path')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const axios = require('axios').default;
const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));



const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(express.static('dist'))
app.use(express.static('dist'))

console.log(__dirname)

app.use(express.json()); // To parse the incoming requests with JSON payloads

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Setup Server
const port = 3000;

const server = app.listen(port,listening);

function listening() {
  console.log(server);
  console.log(`running on localhost: ${port}`);
}

//GET request
app.get("/all", function (req,res) {
  res.send('dist/index.html')
})

app.get("/test", async (req,res) => {
  res.json({message:'pass!'})

});
//API storing 
let geoNameData = {}

//POST request 
app.post("/addAPI", async function (req,res) {
  let formDestination = req.body
  let geonameData = await getGeonameData(formDestination)
  let weatherbitData = await getWeatherData(geoNameData)
  let pixabyData = await getPixabyData(geoNameData)
  console.log(geoNameData)
  res.send(geoNameData)
  //console.log(formDestination)
})


async function getGeonameData(formDestination) {
    const geonameUsername = `sereneissa123`
    const geonameURL = `http://api.geonames.org/postalCodeLookupJSON?postalcode=${formDestination}&country=USA&maxRows=20&username=sereneissa123`
    const geonameResponse = {
      method: 'POST',
      mode: 'cors',
      body:JSON.stringify(geonameURL),
      redirect: 'follow'

     

  }
    
    let response = await fetch (geonameURL, geonameResponse)
    let data = await response.json()

    geoNameData.cityName = data.postalcodes[0].adminName2;
    geoNameData.country = data.postalcodes[0].countryCode;
    geoNameData.latitude = data.postalcodes[0].lat;
    geoNameData.longitude = data.postalcodes[0].lng;

    console.log(data)
    return geoNameData
    
      //console.log(formDestination)

}

async function getWeatherData(geoNameData) {
  const weatherAPIKey = `29b82de2b01f4bba9f0620befefa4193`;
  const weatherbitURL = `https://api.weatherbit.io/v2.0/current?lat=${geoNameData.latitude}&lon=${geoNameData.longitude}&key=${weatherAPIKey}&include=minutely`;
  console.log(weatherbitURL)
  const weatherBitResponse = {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow'
  }

  let response  = await fetch(weatherbitURL, weatherBitResponse)
  let data = await response.json()
  console.log(data)
  
  geoNameData.forecast = `${data.data[0].temp}°C`;

  return geoNameData
}

async function getPixabyData(geoNameData) {
  const pixabyAPIKey = `24691018-39a9bd1f1f4754219a0859773`;
  const pixabyURL = `https://pixabay.com/api/?key=${pixabyAPIKey}&category=travel`
  console.log(pixabyURL)
  const pixabyResponse = {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow'
  }
    let response  = await fetch(pixabyURL, pixabyResponse)
    let data = await response.json()
    console.log(data)

    geoNameData.image = data.hits[0].webformatURL
    

    return geoNameData
  }






