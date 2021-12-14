// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
var path = require('path')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const axios = require('axios').default;


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


//POST request 
app.post("/addAPI", async function (req,res) {
  let location = req.body.text
  let geonameData = await getGeonameData(location)
  let weatherbitData = await getWeatherData(projectData)

  conseole.log(projectData)
  res.send(projectData)

})

async function getGeonameData(formDestination) {
  const geonameUsername = `serene.issa`
  const geonameURL = `http://api.geonames.org/searchJSON?q=${formDestination}&maxRows=1&username=${geonameUsername}`
  const geonameResponse = {
    method: 'POST',
    mode: 'cors',
    body:JSON.stringify(geonameURL),
    redirect: 'follow'
}
  
let response = await fetch (geonameURL, geonameResponse)
let data = await response.json()

projectData.cityName = data.geonames[0].name 
projectData.country = data.geonames[0].countryName
projectData.latitude = data.geonames[0].lat 
projectData.longitude = data.geonames[0].lng 

return projectData

}

async function getWeatherData(projectData) {
  const weatherAPIKey = `29b82de2b01f4bba9f0620befefa4193`
  const weatherbitURL = `https://api.weatherbit.io/v2.0/current?lat=${projectData.latitude}&lon=${projectData.longitude}&key=${weatherAPIKey}`
  console.log(weatherbitURL)
  const weatherBitResponse = {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow'
  }

  let response  = await fetch(weatherbitURL, weatherBitResponse)
  let data = await response.json()
  console.log(data)
  
  projectData.weather = data.data[0].weather
  return projectData
}





