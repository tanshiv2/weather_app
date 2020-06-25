const request = require('request')

const forecast = (location, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=20c7d176276b771505415774f7c21034&query=' + location
    request({url, json:true }, (error, {body}) => {    
        if(error)
        {
            callback('Unable to connect to the internet', undefined)
        } else if(body.error){
            callback('Location is not entered', undefined)
        } else {
            callback(undefined, {description: body.current.weather_descriptions,
                img: body.current.weather_icons,
                temp: body.current.temperature,
                precip: body.current.precip})
        }
    })
}

  module.exports = forecast