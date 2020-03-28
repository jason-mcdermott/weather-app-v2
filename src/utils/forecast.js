let request = require('request')
const config = require('../config');

let forecast = (latitude, longitude, callback) => {
    let url = `https://api.darksky.net/forecast/${config.DARK_SKY_API_KEY}/${latitude},${longitude}`

    request({ url, json: true }, (err, { body }) => {
        if(err) { 
            callback('unable to connect to weather service') 
        }
        else if(body.error) {
            callback('weather service error: ' + body.error)
        }
        else {
            callback(undefined, body.daily.data[0].summary)
        }
    })
}

module.exports = forecast