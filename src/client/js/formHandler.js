
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


})
}

export { handleSubmit }


