function countDown() {
    let dateStart = document.getElementById('departure-date').value 
    let todayDate = new Date()
    let start = dateStart.split('-')
    let travelDate = new Date(start[0],start[1] -1, start[2]- 2)

    const dateDifference = Math.round((travelDate - todayDate) / 1000 / 60 / 60 / 24 * 10) / 10
    return dateDifference
}

export {countDown}