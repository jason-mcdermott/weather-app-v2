let path = require('path')
let express = require('express')
let hbs = require('hbs')
let geocode = require('./utils/geocode')
let forecast = require('./utils/forecast')

let app = express()
const port = process.env.PORT || 3000

// define paths for express config
let public = path.join(__dirname + '../../public')
let viewsPath = path.join(__dirname, '../templates/views')
let partialsPath = path.join(__dirname, '../templates/partials')

const creator = 'Jason McDermott'

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory
app.use(express.static(public))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: creator
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: creator
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        text: 'Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor.',
        name: creator
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecast) => {
            if(error) {
                return res.send({ error })
            }
            
            res.send({ forecast, location, address: req.query.address })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Not Found',
        name: creator,
        message: 'Help article not found.'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: 'Not Found',
        name: creator,
        message: 'Page not found.'
    })
})

app.listen(port, console.log(`started listening on port ${port}`))