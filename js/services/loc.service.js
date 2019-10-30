
export default {
    getLocs,
    getPosition,
    getLocationName,
    getCoords
}

var locs = [{ lat: 11.22, lng: 22.11 }]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });

}


function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function getLocationName({lat, lng}){
    return new Promise((resolve, reject) => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDu-jadYwdg3U7sOlVq9ZyoG_a-Uls3vcc`)
            .then(data => resolve(data.json()))
    });
}

function getCoords(address){
    return new Promise((resolve, reject) => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDu-jadYwdg3U7sOlVq9ZyoG_a-Uls3vcc`)
            .then(data => resolve(data.json()))
    })
}