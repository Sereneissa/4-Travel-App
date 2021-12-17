function handleSubmit(event) {
  event.preventDefault()


  let formDestination = document.getElementById('destination').value
  let formDate = document.getElementById('departure-date').value
  
  console.log(formDate)
  console.log(formDestination)


   fetch('http://localhost:8081/addAPI', {
    method:'POST',
    credentials: 'same-origin',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({text: formDestination})
  })


  .then (res => res.json())
  .then (res => {
      console.log(res);

    const countDownClock = new Date(formDate).getTime()
    const y = setInterval(function() {
      const dateNow = new Date().getTime()

      const diffDays = countDownClock - dateNow

      const seconds = Math.floor((diffDays / 1000) % 60);
      const minutes = Math.floor((diffDays / 1000 / 60) % 60);
      const hours = Math.floor((diffDays / (1000 * 60 * 60)) % 24);
      const days = Math.floor(diffDays / (1000 * 60 * 60 * 24));

      document.getElementById("countdown-clock").innerHTML = days + "d" + ''+ hours + "h " + minutes + "m " + seconds + "s "

      }, 1000)
 
 
      document.getElementById('resultsDate').innerHTML = formDate;
      document.getElementById('cityName').innerHTML = res.cityName;
      document.getElementById('countryName').innerHTML = res.country;
      document.getElementById('forecast').innerHTML = res.forecast
      document.getElementById('resultsimg').src = res.image
    })
  
}


export { handleSubmit }