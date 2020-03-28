let request = require('request')
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN || require('../config').MAPBOX_ACCESS_TOKEN

let geocode = (address, callback) => {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_ACCESS_TOKEN}&limit=1`

    request({ url, json: true }, (err, { body }) => {
        if(err) { 
            callback('unable to connect to geocode service')
        }
        else if(body.message) {
            callback('geocode service error: ' + body.message)
        }
        else if(body.features.length < 1) {
            callback('unable to find a location with that name')
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1], 
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }) 
        }
    })
}

module.exports = geocode