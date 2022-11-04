const express = require("express");
const http = require("https");
const body = require("body-parser");

const app = express();
app.use(body.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=16a49ae508d0a5ee8657f45e14007dcc";

    http.get(url, function(response) {
        response.on("data", function(data) {
            const weatherData = JSON.parse(data)
            const description = weatherData.weather[0].description
            const temp = weatherData.main.temp
            const icon = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";

            res.write("<p>The weather in " + query + " says " + description)
            res.write("<h1>The weather in " + query + " is currently " + temp + " in Celsius.</h1>")
            res.write("<img src=" + icon + ">")
            res.send()
        })
    })
})

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});