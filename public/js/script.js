let form = document.querySelector('form')
let search = form.querySelector('input[type="text"]')
let messageOne = document.querySelector('#message-one') 
let messageTwo = document.querySelector('#message-two') 

messageOne.textContent = ''
messageTwo.textContent = ''

form.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'loading...'
    let location = search.value

    fetch('/weather?address=' + location)
        .then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    messageOne.textContent = ''
                    messageTwo.textContent = data.error
                }
                else {
                    console.log(data.forecast)
                    messageOne.textContent = ''
                    messageTwo.textContent = 
                    `
                    The forecast for ${location} today: ${data.forecast.dailySummary} 
                    There is a ${Math.round(data.forecast.dailyprecipProbability*100)}% chance of ${data.forecast.dailyPrecipType} today.
                    It is currently ${Math.round(data.forecast.currentTemperature)}°. 
                    The expected high today is ${Math.round(data.forecast.dailyTemperatureHigh)}°
                    with an expected low of ${Math.round(data.forecast.dailyTemperatureLow)}°.
                    `
                }

                search.value = ''
            })
        })
})