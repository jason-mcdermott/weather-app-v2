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
                    messageOne.textContent = ''
                    messageTwo.textContent = `Forecast for ${location} today: ${data.forecast}` 
                }

                search.value = ''
            })
        })
})