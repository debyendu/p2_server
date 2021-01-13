const path = require('path');
const express = require('express');
const hbs = require('hbs');
const data = require('./utils/note-one.js');
const fetch = require("node-fetch");
const port = process.env.PORT || 3000;

const app = express();


//define path for express config
const publicDirectoryPath = path.join(__dirname,'/public');
const viewsPath = path.join(__dirname,'/template/views');
const partialPath = path.join(__dirname,'/template/partials');


//Set up handelbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//Set up sattic directory
app.use(express.static(publicDirectoryPath));


//route handler
app.get('',(req,res) =>{
    res.render('index',{
        title: "Aryavart"
    });
})
app.get('/help',(req,res) =>{
    res.render('help',{
        title: "Aryavart",
        dir:"purify center"
    });
})
app.get('/about',(req,res) =>{
    res.render('about',{
        title:"Aryavart",
        info:"supreme community for the betterment of human kind"
    });
})

app.get('/weather', (req, res) =>{

    if(!req.query.address) return res.send({
        error:"Address must be provided"
    })

    data.location(req.query.address, (err,{long,lat}={})=>{
        if(long != '' && lat != '') data.forecast({long,lat},(err,{body}) =>{

            res.send({
                forecast: body.current.weather_descriptions[0],
                weather: body.current.temperature,
                address: req.query.address,
            });
        })
    })

    
});

app.get('*', (req, res) =>{
    res.render('404');
});

app.listen(port, () =>{
    console.log("Running: " +port);
});



