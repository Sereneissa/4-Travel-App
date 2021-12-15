function handleSubmit(event) {
    event.preventDefault()

    let formDestination = document.getElementById('destination').value
    let formDate = document.getElementById('departure-date').value

    console.log(formDate)
    console.log(formDestination)


    fetch('http://localhost:3000/addAPI', {
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
        console.log(res)

      let countDownClock = new Date(formDate).getTime()
      let y = setInterval(function() {
        let dateNow = new Date().getTime()

        let diffDays = countDownClock - dateNow

        let days = Math.floor(diffDays / (1000 * 60 * 60 *24))

        let hours = Math.floor((diffDays % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

        let minutes = Math.floor((diffDays % (1000 * 60 * 60)) / (1000 * 60))

        let seconds = Math.floor((diffDays % (1000 * 60)) / 1000)

        document.getElementById("countdown-clock").innerHTML = days + "d" + ''+ hours + "h " + minutes + "m " + seconds + "s "

    }, 
    1000)

        
    //document.getElementById('resultsdate').innerHTML = formDate
    document.getElementById('cityName').innerHTML = res.cityName
    document.getElementById('countryName').innerHTML = res.country
    document.getElementById('forecast').innerHTML = res.forecast
    document.getElementById('resultsimg').src = res.image
    })

  
}
   


export { handleSubmit }


