const handleUI = (res) => {

    let formDate = document.getElementById('departure-date').value;

    document.getElementById('resultsDate').innerHTML = formDate;
    document.getElementById('cityName').innerHTML = res.cityName;
    document.getElementById('countryName').innerHTML = res.country;
    document.getElementById('forecast').innerHTML = res.forecast;
    document.getElementById('weatherIcons').src = res.weatherIcon;
    document.getElementById('resultsimg').src = res.image;
  
}



export { handleUI };
