const request = require('request')

const fullLocation = (location, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=20c7d176276b771505415774f7c21034&query=' + location
    request({url, json:true }, (error, {body}) => {    
        if(error)
        {
            callback('Unable to connect to the internet', {undefined})
        } else if(body.error){
            callback('This location does not exist', {undefined})
        } else {
            callback(undefined, {name: body.location.name, country:body.location.country})
        }
    })
}

  module.exports = fullLocation