const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { send } = require('process')
const { query } = require('express')
const request = require('request')

const forecast = require('./utils/forecast.js')
const fullLocation = require('./utils/fullLocation.js')

const app = express()

//Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))


app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shivangi Tanwar'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help page',
        helpText: 'Send your queries at',
        email: 'nickyhawk@ymail.com',
        name: 'Shivangi Tanwar'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Shivangi Tanwar'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.location) {
        return res.send({
            error: 'You must provide a location!'
        })
    }

    const location = req.query.location

        fullLocation(location, (error, {name, country}) => {
          if (error)
          {
            return res.send({ error})
          }
          forecast(location, (error, {description, img, temp, precip}) => {
            if(error)
            {
              return res.send('Unable to fetch data')
            }     
         
            res.send({
            location: name + ', ' + country,
            description: description, 
            img,
            forecast: 'It is currently ' + temp + '°C. There is ' + precip + '% chance of rain.'
            })
        
        })
    })
    
})

app.get('/product', (req,res) =>{
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title:'Error page',
        name:'Shivangi Tanwar',
        error:'Help article not found!'})
})

app.get('*', (req,res) => {

    res.render('404', { 
        title: 'Error page',
        name: 'Shivangi Tanwar',
        error: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running on port 3000')
})
