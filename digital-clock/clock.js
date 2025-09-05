const spans = document.querySelectorAll("div span:first-of-type")
const displayDate = document.getElementById("date-display")
const toggleButton = document.getElementById("toggle-format")
const amPmDisplay = document.getElementById("am-pm")

let is24Hour = true

function setClock(){
    const hour = new Date().getHours()
    const minute = new Date().getMinutes()
    const second = new Date().getSeconds()
    const milliseconds = new Date().getMilliseconds()

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    displayDate.textContent = new Date().toLocaleDateString(undefined, options)

    let displayHour
    let amPm = ''
    if (is24Hour) {
        displayHour = hour < 10 ? `0${hour}` : hour
        amPmDisplay.textContent = '24 Hrs'
    } else {
        displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
        displayHour = displayHour < 10 ? `0${displayHour}` : displayHour
        amPm = hour >= 12 ? 'PM' : 'AM'
        amPmDisplay.textContent = amPm
    }
    spans[0].textContent = displayHour
    spans[1].textContent = minute < 10 ? `0${minute}` : minute
    spans[2].textContent = second < 10 ? `0${second}` : second
    spans[3].textContent = milliseconds < 100 ? (milliseconds < 10 ? `00${milliseconds}` : `0${milliseconds}`) : milliseconds
}

toggleButton.addEventListener('click', () => {
    is24Hour = !is24Hour
    setClock()
})

setInterval(setClock, 200)
