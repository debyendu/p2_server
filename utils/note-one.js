const superagent = require('superagent');

const forecast = (query, callback) => {
    const url = `http://api.weatherstack.com/forecast?access_key=8a5de38f8815d69810cfcff1667ad891&query=${query.lat},${query.long}
    `
    
    superagent.get(url, (err, res) => {
        if (err) callback(err, undefined);
        else callback(undefined, res);
    })
}
const location = (search_text, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${search_text}.json?access_token=pk.eyJ1Ijoicm9ja2VyNDIwMCIsImEiOiJja2ppaTF5NGkwejdqMnpxb2FmMm9scjVzIn0.Vu7QGDwsjT-ohZ02qpvgBA
                `
    superagent.get(url).end((err, res) => {
        
        // Do something
        if (err) {
            if (err.status) {
               callback(err.status,undefined);
            } else if (err.code) {
                callback(err.code,undefined);
            }
        }
        else {
            const json = JSON.parse(res.text);
            callback(undefined,{
                long: json.features[0].center[0],
                lat: json.features[0].center[1]
            });
        }
    })
}


module.exports = {
    forecast: forecast,
    location: location
};