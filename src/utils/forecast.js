let request = require('request')
const DARK_SKY_API_KEY = process.env.DARK_SKY_API_KEY || require('../config').DARK_SKY_API_KEY

let forecast = (latitude, longitude, callback) => {
    let url = `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${latitude},${longitude}`

    request({ url, json: true }, (err, { body }) => {
        if(err) { 
            callback('unable to connect to weather service') 
        }
        else if(body.error) {
            callback('weather service error: ' + body.error)
        }
        else {
            callback(undefined, {
                currentTemperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
                dailySummary: body.daily.data[0].summary,
                dailyprecipProbability: body.daily.data[0].precipProbability,
                dailyPrecipType: body.daily.data[0].precipType,
                dailyTemperatureHigh: body.daily.data[0].temperatureHigh,
                dailyTemperatureLow: body.daily.data[0].temperatureLow
            })
        }
    })
}

module.exports = forecast