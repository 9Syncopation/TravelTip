console.log('Main!');

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'


locService.getLocs()
    .then(locs => console.log('locs', locs))



window.onload = () => {
    mapService.initMap()
        .then(() => {
            mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
            locService.getLocationName({ lat: 32.0749831, lng: 34.9120554 }).then(data => document.querySelector('.location-text').innerText = data.plus_code.compound_code.substring(8));
        })
        .catch(console.log('INIT MAP ERROR'));


    locService.getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

document.querySelector('.btn-my-location').addEventListener('click', (ev) => {
    locService.getPosition()
        .then(pos => {
            onSelectPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        })
        .catch(err => {
            console.log('err!!!', err);
        })
})

function onSelectPos(pos) {
    mapService.panTo(pos.lat, pos.lng);
    mapService.addMarker({ lat: pos.lat, lng: pos.lng });
    locService.getLocationName({ lat: pos.lat, lng: pos.lng }).then(data => document.querySelector('.location-text').innerText = data.plus_code.compound_code.substring(8));
}

function onSearch() {
    let search = document.querySelector('#search-input').value;
    locService.getCoords(search)
        .then(data => {
            onSelectPos(data.results[0].geometry.location);
        })
}

document.querySelector('.btn-search').addEventListener('click', ev => onSearch());

