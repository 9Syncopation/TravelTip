export default {
    getTodayWeather
}

function getTodayWeather({lat, lon}){
    return new Promise(resolve => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=2185cb314ffbd44ade56377de3b6ba88`)
            .then(data => resolve(data.json()));
    })
}